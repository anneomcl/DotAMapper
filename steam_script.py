import json

f = open('dota2_data.csv','w')
f.write('likes,Kdratio\n')
paths = ['json/613379400.json', 'json/785923491.json', 'json/774695687.json', 'json/774622831.json',
         'json/787345302.json', 'json/621555666.json', 'json/959026081.json',
         'json/818016838.json', 'json/834549743.json'] #add json file paths here , 'json/959213251.json'
for file in paths:
    data = open(file)
    steam_data = json.load(data)
    data.close()

    kd_ratios = []
    for item in steam_data["result"]["players"]:
        if((item["kills"] + item["deaths"]) > 0):
            kd = (item["kills"] - item["deaths"])/(item["kills"] + item["deaths"])
        else:
            kd = 0
        kd_ratios.append(kd)

    if(steam_data["result"]["negative_votes"] != 0 ):
        likes = (steam_data["result"]["positive_votes"] / steam_data["result"]["negative_votes"])
    else:
        likes = steam_data["result"]["positive_votes"]

    #print("%.0f" % likes,", ", steam_data["result"]["match_id"])

    for ratio in kd_ratios:
        f.write("%.0f" % likes + ","+ "%.2f" % ratio + "\n")
f.close()