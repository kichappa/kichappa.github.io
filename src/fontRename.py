from fontTools import ttLib
from os import listdir, rename

files = listdir("fonts")
fonts = []

css = open("fonts.css", "w")


weights = {
    "Hairline": 50,
    "Thin": 100,
    "Extra Light": 200,
    "ExtraLight": 200,
    "Light": 300,
    "None": 400,
    "Medium": 500,
    "Semibold": 600,
    "Bold": 700,
    "ExtraBold": 800,
    "Black": 900,
    "Ultra Black": 950,
}

style = {
    "Italic": "italic",
    "Bold Italic": "italic",
    "Regular": "normal",
    "Bold": "normal",
}

for file in files:
    font = ttLib.TTFont("fonts/{}".format(file))
    fullName = font["name"].getDebugName(4).replace(" ", "-")
    # print(fullName)
    # for i in [1, 2, 4, 6, 7, 16, 17, 20, 21, 22, 25]:
    # for i in [1, 2, 4, 16, 17]:
    # for i in [2]:
    # print("'{} {}'".format(i, font["name"].getDebugName(i)))
    typoSubName = font["name"].getDebugName(17)
    if typoSubName == None and font["name"].getDebugName(2) in ["Italic", "Regular"]:
        # print("\t\t1")
        typoSubName = "None"
    elif not font["name"].getDebugName(2) in ["Italic", "Regular"]:
        # print("\t\t2")
        typoSubName = font["name"].getDebugName(2).replace("Italic", "")
    else:
        # print("\t\t3")
        typoSubName = typoSubName.replace(font["name"].getDebugName(2), "").strip()
    fontFamily = font["name"].getDebugName(16)
    if fontFamily == None:
        fontFamily = font["name"].getDebugName(1)
    # print(fontFamily, "-", typoSubName, sep="")
    # print("Key = {}".format(typoSubName))
    # print("'{}'".format(a.replace(font["name"].getDebugName(2), "").strip()))
    # print("'{}'".format(weights[a.replace(font["name"].getDebugName(2), "").strip()]))
    # print("'{}'".format(style[font["name"].getDebugName(2)]))

    # break
    # print("@font-face {")
    # print('  font-family: "{}";'.format(fontFamily.replace(" ", "")))
    # print('  src: url("{}") format("opentype");'.format("fonts/{}".format(file)))
    # print("  font-weight: {};".format(weights[typoSubName.strip()]))
    # print("  font-style: {};".format(style[font["name"].getDebugName(2)]))
    # print("}")
    # print()
    fonts.append(
        {
            "font-family": fontFamily.replace(" ", ""),
            "src": 'url("{}") format("opentype")'.format("fonts/{}".format(file)),
            "font-weight": weights[typoSubName.strip()],
            "font-style": style[font["name"].getDebugName(2)],
        }
    )

    # print("'2{}'".format(fullName))

    # rename("fonts/{}".format(file), "fonts/{}.otf".format(font["name"].getDebugName(6)))
fonts = sorted(fonts, key=lambda item: (item["font-family"], item["font-weight"]))

for font in fonts:
    print("@font-face {")
    print('  font-family: "{}";'.format(font["font-family"]))
    print("  src: {};".format(font["src"]))
    print("  font-weight: {};".format(font["font-weight"]))
    print("  font-style: {};".format(font["font-style"]))
    print("}")
