from tickets import TicketManager
from monitor import Monitor
from reports import ReportGenerator
from utils import backup_csv

tm = TicketManager()

while True:
    print("\n1.Create \n2.View \n3.Search \n4.Close \n5.Delete \n6.SLA \n7.Monitor \n8.Report \n9.Backup \n0.Exit")
    ch = input("Enter a Choice: ")

    try:
        if ch == "1":
            print("Ticket ID:", tm.create_ticket(input("Emp:"), input("Dept:"), input("Issue:")))

        elif ch == "2":
            print(tm.view())

        elif ch == "3":
            print(tm.search(int(input("ID:"))))

        elif ch == "4":
            tm.close(int(input("ID:")))

        elif ch == "5":
            tm.delete(int(input("ID:")))

        elif ch == "6":
            breached = tm.sla_check()

            if not breached:
                print("No SLA breached tickets")
            else:
                print("SLA Breached Tickets:")
                for t in breached:
                    print(f"ID: {t['id']}, Issue: {t['issue']}, Priority: {t['priority']}")

        elif ch == "7":
            Monitor.check()

        elif ch == "8":
            print("\n--- Daily Report ---")
            daily = ReportGenerator.daily()
            for k, v in daily.items():
                print(f"{k}: {v}")

            print("\n--- Monthly Report ---")
            monthly = ReportGenerator.monthly()
            for k, v in monthly.items():
                print(f"{k}: {v}")

        elif ch == "9":
            backup_csv(tm.tickets)
            print("Backup done")

        elif ch == "0":
            break

    except Exception as e:
        print("Error:", e)