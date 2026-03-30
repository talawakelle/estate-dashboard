class WorkbookRepository:
    def __init__(self):
        self._latest_filename: str | None = None
        self._latest_bytes: bytes | None = None

    def save(self, filename: str, content: bytes):
        self._latest_filename = filename
        self._latest_bytes = content

    def get(self):
        return {
            "filename": self._latest_filename,
            "content": self._latest_bytes,
        }