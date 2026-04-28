import psutil
from tickets import TicketManager
from logger import log

class Monitor:

    @staticmethod
    def check():
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent
        disk = psutil.disk_usage('/').percent

        print(f"CPU Usage: {cpu}%")
        print(f"Memory Usage: {memory}%")
        print(f"Disk Usage: {disk}%")

        tm = TicketManager()

        if cpu > 90:
            print("⚠ High CPU detected → Creating ticket")
            tm.create_ticket("System", "IT", "Server Down")
            log("CRITICAL", "High CPU Usage")

        if memory > 95:
            print("⚠ High Memory detected → Creating ticket")
            tm.create_ticket("System", "IT", "Server Down")
            log("CRITICAL", "High Memory Usage")

        if disk > 90:
            print("⚠ Low Disk Space → Creating ticket")
            tm.create_ticket("System", "IT", "Server Down")
            log("CRITICAL", "Low Disk Space")