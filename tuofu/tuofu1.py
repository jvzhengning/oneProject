from selenium import webdriver
from selenium.webdriver import ChromeOptions,ActionChains
from chaojiying import Chaojiying_Client
from PIL import Image
import time,random


def cjy():
    chaojiying = Chaojiying_Client('cjyyhmbhf', 'pin86648535', '902284')  # 用户中心>>软件ID 生成一个替换 96001
    im = open('code.png', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
    real=chaojiying.PostPic(im, 1902)
    return real
# from selenium.webdriver.chrome.options import Options
#
#
# op = Options()
# op.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
op=ChromeOptions()
op.add_experimental_option("excludeSwitches",["enable-automation"])
driver=webdriver.Chrome(executable_path='../chromedriver.exe',options=op)
driver.maximize_window()
driver.get('https://toefl.neea.cn/')
swA=ActionChains(driver)
cookies=driver.get_cookies()
time.sleep(1)
login_a=driver.find_element_by_xpath('/html/body/div[3]/div/div/div[2]/a[1]')
time.sleep(1)
for cookie in cookies:
            if "expiry" in cookie:
                cookie.pop("expiry")
            print(cookie)
            driver.add_cookie(cookie)
login_a.click()
time.sleep(random.uniform(2,3))
username=driver.find_element_by_xpath('//*[@id="userName"]')
time.sleep(random.uniform(2,3))
name='1281490'
for a in name:
    time.sleep(random.random())
    username.send_keys(a)
textpassword=driver.find_element_by_xpath('//input[@id="textPassword"]')
time.sleep(3)
password='zyc6956769!'
for a in password:
    time.sleep(random.random())
    textpassword.send_keys(a)
label=driver.find_element_by_xpath('//input[@id="verifyCode"]')
time.sleep(random.uniform(2,3))
label_loacation=label.location
label_size=label.size
windowsize=driver.get_window_size()
time.sleep(random.uniform(2,3))
top=driver.find_element_by_xpath('//*[@id="wg_topper"]/div[3]/div/div')
toplocation=top.location
swA.move_to_element_with_offset(top,0,0).perform()
time.sleep(random.uniform(2,3))
def wxy():
    wx=random.randint(0,windowsize['width']//3)
    wy=random.randint(0,windowsize['height']//3)
    return wx,wy
x=random.randint(label_loacation['x'],(label_loacation['x']+label_size['width']))
y=random.randint(label_loacation['y'],(label_loacation['y']+label_size['height']))
wxx=0
wyy=0
x1=1
y1=1
print(windowsize)
for a in range(random.randint(3,6)):
    wxyreal=wxy()
    if wyy + wxyreal[1] * y1  > windowsize['height']-toplocation['y'] :
        y1=-1
    else:
        y1=1
    wyy += wxyreal[1] * y1
    if wxx + wxyreal[0] * x1>windowsize['width']-toplocation['x']:
        x1=-1
    else:
        x1=1
    wxx += wxyreal[0] * x1
    print(wxx,wyy,"""qwweryuyuj""")
    swA.move_by_offset(wxyreal[0]*x1, wxyreal[1]*y1)
    print(wxyreal,x1,y1, """IIIIIIIIIIIIIIIIIIIIIIIIIII""",wxx,wyy)
    time.sleep(random.random()*3)
print(x, y, label_loacation, label_size)
# cookies=driver.get_cookies()
# for cookie in cookies:
#             if "expiry" in cookie:
#                 print(hasattr(cookie,"expiry"))
#                 cookie.pop("expiry")
#             driver.add_cookie(cookie)
time.sleep(2)
swA.move_to_element_with_offset(label,random.randint(20,70),random.randint(3,15)).click().perform()
time.sleep(10)
codeimg=driver.find_element_by_xpath('//div[@id="divCaptcha"]/img[@id="chkImg"]')
time.sleep(5)
driver.save_screenshot('tuofulogin.png')
locat=codeimg.location
size=codeimg.size
rangle=(locat['x'],locat['y'],locat['x']+size['width'],locat['y']+size['height'])
time.sleep(2)
i=Image.open('tuofulogin.png')
codepng=i.crop(rangle)
codepng.save('code.png')
pic_str=cjy()['pic_str']
for a in pic_str:
    time.sleep(random.random())
    label.send_keys(a)
loginclick=driver.find_element_by_xpath('//input[@id="btnLogin"]')
# for cookie in cookies:
#             if "expiry" in cookie:
#                 cookie.pop("expiry")
#             print(cookie)
#             driver.add_cookie(cookie)
loginclick.click()
time.sleep(random.uniform(2.5,3.5))
driver.find_element_by_xpath()

