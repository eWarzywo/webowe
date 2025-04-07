from datetime import date, datetime


class Student:
    def __init__(self, _id : int, first_name : str, last_name : str, birth_date : datetime):
        self._id = _id
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date

    @property
    def age(self)->int:
        current_year = date.today().year
        return current_year - self.birth_date.year

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.age})"