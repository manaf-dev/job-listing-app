import logging


def get_logger(name: str):
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[logging.FileHandler("job_listings.log"), logging.StreamHandler()],
    )
    return logging.getLogger(name)
