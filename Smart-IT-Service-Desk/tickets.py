from datetime import datetime, timedelta
from utils import load_json, save_json
from logger import log
from itil import ITIL
import re

class TicketNotFoundError(Exception):
    pass

PRIORITY = {
    "Server Down": "P1",
    "Internet Down": "P2",
    "Laptop Slow": "P3",
    "Password Reset": "P4"
}

SLA = {"P1":1, "P2":4, "P3":8, "P4":24}

# Decorator
def logger_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Running {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

class Ticket:

    def __init__(self, emp, dept, issue):
        if not emp or not dept or not issue:
            raise ValueError("Empty values not allowed")

        if not re.match(r"^[A-Za-z ]+$", emp):
            raise ValueError("Invalid name")

        tickets = load_json("data/tickets.json")
        self.id = max([t["id"] for t in tickets], default=0) + 1
        self.emp = emp
        self.dept = dept
        self.issue = issue
        self.priority = PRIORITY.get(issue, "P4")
        self.status = "Open"
        self.created = datetime.now().isoformat()

    def to_dict(self):
        return self.__dict__


class IncidentTicket(Ticket):
    pass

class ServiceRequest(Ticket):
    pass

class TicketManager:

    def __init__(self):
        self.file = "data/tickets.json"
        self.tickets = load_json(self.file)

    @logger_decorator
    def create_ticket(self, emp, dept, issue):
        t = Ticket(emp, dept, issue)
        self.tickets.append(t.to_dict())
        save_json(self.file, self.tickets)

        ITIL.incident(t.to_dict())
        ITIL.service_request(t.to_dict())
        ITIL.problem_management()
        ITIL.change(t.to_dict())

        log("INFO", f"Ticket created {t.id}")
        return t.id

    def view(self):
    # ✅ sorting tickets by ID
        return sorted(self.tickets, key=lambda x: x["id"])

    def search(self, tid):
        for t in self.tickets:
            if t["id"] == tid:
                return t
        raise TicketNotFoundError("Ticket not found")

    def update(self, tid, status):
        for t in self.tickets:
            if t["id"] == tid:
                t["status"] = status
                save_json(self.file, self.tickets)
                log("INFO", f"Updated {tid}")
                return
        raise TicketNotFoundError("Invalid ID")

    def close(self, tid):
        self.update(tid, "Closed")

    def delete(self, tid):
        self.tickets = [t for t in self.tickets if t["id"] != tid]
        save_json(self.file, self.tickets)
        log("WARNING", f"Deleted {tid}")

    # Generator
    def ticket_generator(self):
        for t in self.tickets:
            yield t

    def sla_check(self):
        breached = []
        for t in self.tickets:
            if t["status"] != "Closed":
                created = datetime.fromisoformat(t["created"])
                if datetime.now() > created + timedelta(hours=SLA[t["priority"]]):
                    breached.append(t)
                    ITIL.escalate(t)
        return breached