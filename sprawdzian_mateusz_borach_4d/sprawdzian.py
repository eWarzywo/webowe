__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Mateusz Borach 4d"

from models.Teachers import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grades import Grades
import datetime
import json
from year_grade import year_grade
from typing import List, Dict, Any, Union

teachers: List[Teacher] = []
subjects: List[Subject] = []
students: List[Student] = []
grades: List[Grades] = []

try:
    with open('teachers.txt', 'r', encoding='utf-8') as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                teacher_id: int = int(parts[0])
                name: str = parts[1]
                surname: str = ' '.join(parts[2:])
                teachers.append(Teacher(teacher_id, name, surname))
except FileNotFoundError:
    print("Error: teachers.txt file not found")
except Exception as e:
    print(f"Error loading teachers: {e}")

teacher_dict: Dict[int, Teacher] = {teacher._id: teacher for teacher in teachers}

try:
    with open('subjects.txt', 'r', encoding='utf-8') as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                subject_id: int = int(parts[0])
                teacher_id: int = int(parts[-1])
                name: str = ' '.join(parts[1:-1])

                if teacher_id in teacher_dict:
                    teacher = teacher_dict[teacher_id]
                    subjects.append(Subject(subject_id, name, teacher))
except FileNotFoundError:
    print("Error: subjects.txt file not found")
except Exception as e:
    print(f"Error loading subjects: {e}")

subject_dict: Dict[int, Subject] = {subject._id: subject for subject in subjects}

try:
    with open('students.txt', 'r', encoding='utf-8') as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 4:
                student_id: int = int(parts[0])
                name: str = parts[1]
                birthdate_str: str = parts[-1]
                surname: str = ' '.join(parts[2:-1])

                try:
                    birthdate = datetime.datetime.strptime(birthdate_str, '%Y-%m-%d')
                    students.append(Student(student_id, name, surname, birthdate))
                except ValueError:
                    print(f"Invalid date format for student {student_id}")
except FileNotFoundError:
    print("Error: students.txt file not found")
except Exception as e:
    print(f"Error loading students: {e}")

student_dict: Dict[int, Student] = {student._id: student for student in students}

try:
    with open('grades.txt', 'r', encoding='utf-8') as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                student_id: int = int(parts[0])
                subject_id: int = int(parts[1])
                grade_values: List[int] = [int(g) for g in parts[2].split(',')]

                if student_id in student_dict and subject_id in subject_dict:
                    student = student_dict[student_id]
                    subject = subject_dict[subject_id]

                    grade_obj = Grades(student, subject)
                    for grade in grade_values:
                        try:
                            grade_obj.add_grade(grade)
                        except ValueError:
                            pass

                    grades.append(grade_obj)
except FileNotFoundError:
    print("Error: grades.txt file not found")
except Exception as e:
    print(f"Error loading grades: {e}")

print("Oceny i średnie poszczególnych uczniów.")

student_grades: Dict[Student, List[Grades]] = {}
for grade_obj in grades:
    student = grade_obj.student
    if student not in student_grades:
        student_grades[student] = []
    student_grades[student].append(grade_obj)

for student in students:
    print(f"{student}")

    if student in student_grades:
        for grade_obj in student_grades[student]:
            subject = grade_obj.subject
            grades_list = grade_obj.get_grades()
            average = grade_obj.get_average()
            final_grade = year_grade(average)

            print(f"\t{subject.name}:")
            print(f"\t\tOceny: {', '.join(map(str, grades_list))}")
            print(f"\t\tŚrednia: {average:.2f}")
            print(f"\t\tOcena końcowa: {final_grade}")
    else:
        print("Brak ocen dla tego ucznia.")

    print()

json_data: List[Dict[str, Any]] = []

for student in students:
    student_str = str(student)

    student_data: Dict[str, Dict[str, Dict[str, Union[str, float, int]]]] = {student_str: {}}

    if student in student_grades:
        for grade_obj in student_grades[student]:
            subject = grade_obj.subject
            grades_list = grade_obj.get_grades()
            average = grade_obj.get_average()
            final_grade = year_grade(average)

            student_data[student_str][subject.name] = {
                "Oceny": ", ".join(map(str, grades_list)),
                "Srednia": round(average, 2),
                "Ocena roczna": final_grade
            }

    json_data.append(student_data)

with open('students.json', 'w', encoding='utf-8') as json_file:
    json.dump(json_data, json_file, indent=4, ensure_ascii=False)

print('=' * 50)
print()

subject_grades: Dict[Subject, List[int]] = {}
for grade_obj in grades:
    subject = grade_obj.subject
    if subject not in subject_grades:
        subject_grades[subject] = []
    subject_grades[subject].extend(grade_obj.get_grades())

for subject in subjects:
    print(f"{subject.name}:")
    print(f"Nauczyciel: {subject.teacher}")

    if subject in subject_grades:
        all_grades = subject_grades[subject]
        average = sum(all_grades) / len(all_grades) if all_grades else 0

        grades_str = ", ".join(map(str, all_grades))
        print(f"Oceny: {grades_str}")
        print(f"Średnia: {average:.2f}")
    else:
        print("Brak ocen dla tego przedmiotu.")

    print()

subject_json_data: List[Dict[str, Any]] = []

for subject in subjects:
    subject_data: Dict[str, Dict[str, Union[str, List[int], float]]] = {
        subject.name: {
            "Nauczyciel": str(subject.teacher),
            "Oceny": subject_grades.get(subject, []),
            "Srednia": round(sum(subject_grades.get(subject, [])) / len(subject_grades.get(subject, [])), 2)
                      if subject_grades.get(subject, []) else 0
        }
    }
    subject_json_data.append(subject_data)

with open('subjects.json', 'w', encoding='utf-8') as json_file:
    basic_json = json.dumps(subject_json_data, indent=4, ensure_ascii=False)

    for subject in subjects:
        if subject in subject_grades:
            grades_str = json.dumps(subject_grades[subject])
            new_format = '[\n' + ',\n'.join(
                [' ' * 12 + str(g) for g in subject_grades[subject]]) + '\n' + ' ' * 8 + ']'
            basic_json = basic_json.replace(grades_str, new_format)

    json_file.write(basic_json)