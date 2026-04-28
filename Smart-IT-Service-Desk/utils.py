import json, csv, os
from datetime import datetime

TICKET_FILE = "data/tickets.json"
LOG_FILE = "data/logs.txt"
BACKUP_FILE = "data/backup.csv"

# -------------------------------
# REQUIRED FUNCTIONS (FIX)
# -------------------------------
def load_json(file):
    if not os.path.exists(file):
        return []
    with open(file, "r") as f:
        return json.load(f)

def save_json(file, data):
    with open(file, "w") as f:
        json.dump(data, f, indent=4)

# -------------------------------
# YOUR EXISTING FUNCTIONS
# -------------------------------
def load_tickets():
    return load_json(TICKET_FILE)

def save_tickets(tickets):
    save_json(TICKET_FILE, tickets)
    backup_csv(tickets)

def get_next_id():
    tickets = load_tickets()
    if not tickets:
        return 1
    return max(t["id"] for t in tickets) + 1

def log_event(msg):
    with open(LOG_FILE, "a") as f:
        f.write(f"{datetime.now()} - {msg}\n")

def backup_csv(tickets):
    try:
        if not tickets:
            return
        with open(BACKUP_FILE, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=tickets[0].keys())
            writer.writeheader()
            writer.writerows(tickets)
    except:
        pass