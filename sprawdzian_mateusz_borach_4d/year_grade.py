def year_grade(average : float)->int:
    if average < 1.85:
        return 1
    elif 1.85 <= average < 2.7:
        return 2
    elif 2.7 <= average < 3.7:
        return 3
    elif 3.7 <= average < 4.7:
        return 4
    elif 4.7 <= average < 5.5:
        return 5
    else:
        return 6