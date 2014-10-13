import json

f = open('dota2_data.csv','w')
f.write('likes,Kdratio\n')
paths = ['613379400.json', '785923491.json']
for file in paths:
    data = open(file)
    steam_data = json.load(data)
    data.close()

    kd_ratios = []
    for item in steam_data["result"]["players"]:
        kd = item["kills"] / item["deaths"]
        kd_ratios.append(kd)

    likes = steam_data["result"]["positive_votes"] / steam_data["result"]["negative_votes"]

    for ratio in kd_ratios:
        f.write("%.0f" % likes + ","+ "%.2f" % -ratio + "\n")
f.close()