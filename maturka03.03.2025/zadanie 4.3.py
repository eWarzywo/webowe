def NotFar(line)->bool:
    check = True
    for i in range(len(line)-1):
        if abs(ord(line[i]) - ord(line[i+1]))  >= 10:
            check = False
    if check: return True
    return False

with open ('sygnaly.txt','r') as file:
    lines = file.readlines()

for line in lines:
    line = line.strip()
    if NotFar(line):
        print(line)
