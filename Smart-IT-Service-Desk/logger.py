import logging
import os

LOG_FILE = "data/logs.txt"

# Ensure folder exists
os.makedirs("data", exist_ok=True)

# Create logger
logger = logging.getLogger("ITILLogger")
logger.setLevel(logging.DEBUG)

# Avoid duplicate handlers
if not logger.handlers:
    file_handler = logging.FileHandler(LOG_FILE)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)


def log(level, msg):
    if level == "INFO":
        logger.info(msg)
    elif level == "WARNING":
        logger.warning(msg)
    elif level == "ERROR":
        logger.error(msg)
    elif level == "CRITICAL":
        logger.critical(msg)