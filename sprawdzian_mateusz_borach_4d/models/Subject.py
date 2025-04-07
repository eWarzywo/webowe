class Subject:
    def __init__(self, _id, name, teacher):
        self._id = _id
        self.name = name
        self.teacher = teacher

    def __str__(self):
        return f"{self.name} {self.teacher}"