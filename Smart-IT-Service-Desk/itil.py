from collections import Counter
from utils import load_json, save_json
from logger import log

class ITIL:

    @staticmethod
    def incident(ticket):
        if ticket["priority"] == "P1":
            log("CRITICAL", f"Critical Incident: {ticket['id']}")
        else:
            log("INFO", f"Incident Created: {ticket['id']}")

    @staticmethod
    def service_request(ticket):
        if ticket["issue"] == "Password Reset":
            ticket["status"] = "Resolved"
            log("INFO", f"Auto resolved password reset: {ticket['id']}")

    @staticmethod
    def problem_management():
        tickets = load_json("data/tickets.json")
        issues = [t["issue"] for t in tickets]
        counter = Counter(issues)

        problems = load_json("data/problems.json")

        for issue, count in counter.items():
            if count >= 5:
                if not any(p["issue"] == issue for p in problems):
                    problems.append({
                        "issue": issue,
                        "count": count,
                        "status": "Problem Open"
                    })
                    log("WARNING", f"Problem created: {issue}")

        save_json("data/problems.json", problems)

    @staticmethod
    def change(ticket):
        log("INFO", f"Change request created for {ticket['id']}")

    @staticmethod
    def escalate(ticket):
        log("CRITICAL", f"SLA Escalation: {ticket['id']}")