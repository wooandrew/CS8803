
# Read from file

id = 1

with open('page/src/app/components/CustomMap.tsx', 'r') as file:
    lines = file.readlines()

    for line in lines:
        if '        <path' in line:
            print(line, end='')
            print('          onClick={() => handleClick(' + str(id) + ')}')
            print('          className={activeItems[' + str(id) + "] ? 'active' : ''}")
            id += 1
        else:
            print(line, end='')
