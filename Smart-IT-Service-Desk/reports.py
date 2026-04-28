from utils import load_json
from datetime import datetime

class ReportGenerator:

    @staticmethod
    def daily():
        tickets = load_json("data/tickets.json")

        total = len(tickets)
        open_tickets = [t for t in tickets if t["status"] == "Open"]
        closed_tickets = [t for t in tickets if t["status"] == "Closed"]
        high_priority = [t for t in tickets if t["priority"] == "P1"]

        # ✅ SLA Breaches
        sla_limits = {"P1":1, "P2":4, "P3":8, "P4":24}
        breached = []

        for t in tickets:
            if t["status"] != "Closed":
                created = datetime.fromisoformat(t["created"])
                if datetime.now() > created:
                    hours = (datetime.now() - created).total_seconds() / 3600
                    if hours > sla_limits[t["priority"]]:
                        breached.append(t)

        return {
            "Total Tickets": total,
            "Open Tickets": len(open_tickets),
            "Closed Tickets": len(closed_tickets),
            "High Priority Tickets": len(high_priority),
            "SLA Breaches": len(breached)
        }


    @staticmethod
    def monthly():
        tickets = load_json("data/tickets.json")

        if not tickets:
            return "No data"

        # ✅ Most common issue
        issues = {}
        for t in tickets:
            issues[t["issue"]] = issues.get(t["issue"], 0) + 1
        most_common_issue = max(issues, key=issues.get)

        # ✅ Department with most incidents
        depts = {}
        for t in tickets:
            depts[t["dept"]] = depts.get(t["dept"], 0) + 1
        top_dept = max(depts, key=depts.get)

        # ✅ Repeated problems
        repeated = [issue for issue, count in issues.items() if count >= 5]

        # ✅ Average resolution time
        resolution_times = []

        for t in tickets:
            if t["status"] == "Closed":
                created = datetime.fromisoformat(t["created"])
                resolved_time = datetime.now()
                hours = (resolved_time - created).total_seconds() / 3600
                resolution_times.append(hours)

        avg_resolution = round(sum(resolution_times)/len(resolution_times), 2) if resolution_times else 0

        return {
            "Most Common Issue": most_common_issue,
            "Avg Resolution Time (hrs)": avg_resolution,
            "Department with Most Incidents": top_dept,
            "Repeated Problems": repeated
        }