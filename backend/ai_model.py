import sys, json, math

def cosine(a, b):
    dot = sum(x*y for x,y in zip(a,b))
    na = math.sqrt(sum(x*x for x in a))
    nb = math.sqrt(sum(x*x for x in b))
    return dot/(na*nb)

data = json.loads(sys.argv[1])
user = data["user"]

jobs = [
    {"name":"CNTT","v":[3,9,2,3,2,6]},
    {"name":"Marketing","v":[2,3,7,8,9,3]},
    {"name":"Kế toán","v":[1,2,1,3,3,10]},
    {"name":"Thiết kế","v":[2,3,10,4,3,2]},
    {"name":"Giáo dục","v":[2,3,3,9,4,5]}
]

res=[]
for j in jobs:
    res.append({
        "job": j["name"],
        "score": round(cosine(user,j["v"]),3)
    })

res.sort(key=lambda x:x["score"], reverse=True)
print(json.dumps(res[:5]))