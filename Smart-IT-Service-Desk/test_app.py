import os
import pytest
from tickets import TicketManager, PRIORITY
from utils import load_json, save_json
from monitor import Monitor

TEST_FILE = "data/test_tickets.json"

@pytest.fixture
def manager():
    if os.path.exists(TEST_FILE):
        os.remove(TEST_FILE)

    save_json(TEST_FILE, [])

    tm = TicketManager()
    tm.file = TEST_FILE
    tm.tickets = []

    return tm


def test_create_ticket(manager):
    tid = manager.create_ticket("User", "IT", "Laptop Slow")

    assert tid is not None
    assert len(manager.tickets) == 1
    assert manager.tickets[0]["emp"] == "User"


def test_priority_logic():
    assert PRIORITY["Server Down"] == "P1"
    assert PRIORITY["Internet Down"] == "P2"
    assert PRIORITY["Laptop Slow"] == "P3"
    assert PRIORITY["Password Reset"] == "P4"


def test_sla_breach(manager):
    tid = manager.create_ticket("User", "IT", "Server Down")

    manager.tickets[0]["created"] = "2020-01-01T00:00:00"

    breached = manager.sla_check()

    assert len(breached) > 0
    assert breached[0]["id"] == tid


def test_monitor_auto_ticket():
    Monitor.check()
    data = load_json("data/tickets.json")
    assert isinstance(data, list)


def test_file_read_write():
    sample = [{"id": 1, "name": "Test"}]
    save_json(TEST_FILE, sample)
    data = load_json(TEST_FILE)
    assert data == sample


def test_search_ticket(manager):
    tid = manager.create_ticket("User", "IT", "Laptop Slow")
    result = manager.search(tid)

    assert result["id"] == tid
    assert result["issue"] == "Laptop Slow"


def test_invalid_ticket(manager):
    with pytest.raises(Exception):
        manager.search(999999)


def test_empty_input(manager):
    with pytest.raises(ValueError):
        manager.create_ticket("", "", "")


def test_duplicate_ticket(manager):
    manager.create_ticket("User", "IT", "Laptop Slow")
    manager.create_ticket("User", "IT", "Laptop Slow")

    assert len(manager.tickets) == 2


def test_generator(manager):
    manager.create_ticket("User", "IT", "Laptop Slow")
    manager.create_ticket("Admin", "HR", "Internet Down")

    tickets = list(manager.ticket_generator())

    assert len(tickets) == 2