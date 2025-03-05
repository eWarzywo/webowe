
with open('sygnaly.txt', 'r') as file:
    lines = file.readlines()

message = ''

for i in range(39, len(lines), 40):
    word = lines[i].strip()
    if len(word) >= 10:
        message += word[9]

print(message)