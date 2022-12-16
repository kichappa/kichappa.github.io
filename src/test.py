from os import listdir

files = listdir("images/Art")
i = 0
for file in files:
    print("import art_{} from '../images/Art/{}';".format(i, file))
    i += 1
# for k, v in sorted(x.items(), key=lambda item: item[1]):
#     print(k, v)
i = 0
for file in files:
    print("art_{},".format(i), end="")
    i += 1
