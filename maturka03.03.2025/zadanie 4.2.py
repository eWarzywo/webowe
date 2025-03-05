def distinctChars(str):
    chars = []
    counter = 0
    for i in range(len(str)):
        if str[i] not in chars:
            counter += 1
            chars.append(str[i])
    return counter

with open ('sygnaly.txt' , 'r') as file:
    lines = file.readlines()

highestVal = 0
message = ''

for line in lines:
    if highestVal < distinctChars(line.strip()):
        message = line
        highestVal = distinctChars(line.strip())

print(message + " " + str(highestVal))
