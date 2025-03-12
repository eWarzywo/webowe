from typing import List

class Student:
    def __init__(self, id_: int, name: str, surname: str, age: int, courses: List[str]):
        self.id = id_
        self.name = name
        self.surname = surname
        self.age = age
        self.courses = courses

class Course:
    def __init__(self, student_id: int, name: str):
        self.student_id = student_id
        self.name = name

# Read students data
students = []
with open('students.txt', 'r') as file:
    for line in file:
        parts = line.strip().split(',')
        student = Student(int(parts[0]), parts[1], parts[2], int(parts[3]), [])
        students.append(student)

# Read courses data
courses = []
with open('courses.txt', 'r') as file:
    for line in file:
        parts = line.strip().split(',')
        course = Course(int(parts[0]), parts[1])
        courses.append(course)

# Map courses to students
for student in students:
    student.courses = [course.name for course in courses if course.student_id == student.id]

# Print student data
for student in students:
    print(f"Name: {student.name} {student.surname}, Age: {student.age}, Courses: {', '.join(student.courses)}")

# Create text files for each student
for student in students:
    filename = f"{student.name}_{student.surname}.txt"
    with open(filename, 'w') as file:
        file.write("Courses:\n")
        for course in student.courses:
            file.write(f"- {course}\n")
