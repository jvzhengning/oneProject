import requests
headers1={"user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3741.400 QQBrowser/10.5.3863.400"}
url='https://www.kugou.com/'
rS=requests.Session()
real=rS.get(url=url,headers=headers1).text
import time
def fun():
    with open("headers.text",mode="r",encoding="utf_8") as f:
        dic={}
        for i in f:
            ilis=i.split(":")
            dic[ilis[0]]=ilis[1].strip().strip("br\n")
        dic['user-agent']=dic['User-Agent']
        dic.pop('User-Agent')
        print(dic)
    return dic
def datafun():
    with open("data.text",mode="r",encoding="utf_8") as f:
        for i in f:
            datalis=i.split(":")
            dic={datalis[0]:datalis[1]}
            print(dic)
        return dic


url="https://webfs.yun.kugou.com/201912051536/84bdf265f98a9753e1ce73ba91aa1a08/G182/M02/1A/01/lpQEAF3j6Q6AUo1eADKuBoZEqCo934.mp3"
# https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19108725237421576131_1575531621277&hash=A4390691E8619C477650DA8BA7F4E84D&album_id=34570352&dfid=&mid=b6f550545f03a35cf07bfa474736ae75&platid=4&_=1575531621279
real=rS.get(url=url,headers=headers1).content
with open('kugou',mode='wb',) as f:
    f.write(real)
# %E5%A6%82%E6%9E%9C%E6%88%91%E4%B8%8D%E6%98%AF%E6%88%91
import hashlib
md5=hashlib.sha256("如果我不是我".encode('utf_8'))9
print(md5.hexdigest())

