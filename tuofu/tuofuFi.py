from selenium import webdriver
from selenium.webdriver import ActionChains
from chaojiying import Chaojiying_Client
from PIL import Image
import time,random


def cjy():
    chaojiying = Chaojiying_Client('cjyyhmbhf', 'pin86648535', '902284')  # 用户中心>>软件ID 生成一个替换 96001
    im = open('code.png', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
    real=chaojiying.PostPic(im, 1902)
    with open('pic_text.text',mode='w',encoding='utf_8') as f:
        f.write(str(real))
    return real
def fun():
    proxy=webdriver.Proxy()
    proxy.proxyType="HTTPS"
    proxy.httpProxy=random.choices(ip["HTTPS"])

    driver=webdriver.Firefox(executable_path='../../geckodriver.exe',proxy=proxy)
    driver.maximize_window()
    driver.get('https://toefl.neea.cn/',)
    swA=ActionChains(driver)
    # cookies=driver.get_cookies()
    time.sleep(random.uniform(2,3))
    login_a=driver.find_element_by_xpath('/html/body/div[3]/div/div/div[2]/a[1]')
    # for cookie in cookies:
    #             if "expiry" in cookie:
    #                 cookie.pop("expiry")
    #             driver.add_cookie(cookie)
    login_a.click()
    time.sleep(random.uniform(2,3))
    username=driver.find_element_by_xpath('//*[@id="userName"]')
    time.sleep(random.uniform(2,3))
    #用户名输入
    name='1281490'
    for a in name:
        time.sleep(random.random())
        username.send_keys(a)
    textpassword=driver.find_element_by_xpath('//input[@id="textPassword"]')
    time.sleep(3)
    #密码输入
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
    # swA.move_to_element_with_offset(top,0,0).perform()
    time.sleep(random.uniform(2,3))

    swA.move_to_element_with_offset(label,random.randint(20,70),random.randint(3,15)).click().perform()
    time.sleep(random.uniform(2,3))
    codeimg=driver.find_element_by_xpath('//div[@id="divCaptcha"]/img[@id="chkImg"]')
    time.sleep(random.uniform(2,3))
    driver.save_screenshot('tuofulogin.png')
    locat=codeimg.location
    size=codeimg.size
    rangle=(locat['x'],locat['y'],locat['x']+size['width'],locat['y']+size['height'])
    time.sleep(2)
    i=Image.open('tuofulogin.png')
    codepng=i.crop(rangle)
    codepng.save('code.png')
    pic_str=cjy()['pic_str']
    time.sleep(3)
    print(pic_str)
    for a in pic_str:
        label.send_keys(a)
        time.sleep(random.random())
    loginclick=driver.find_element_by_xpath('//input[@id="btnLogin"]')
    loginclick.click()
    time.sleep(random.uniform(1.5,2.5))

    try:

        kaoweichaxun=driver.find_element_by_link_text('考位查询')
        kaoweichaxun.click()
        time.sleep(random.uniform(1.5, 2.5))
    except:
        """
        说明验证码识别错误再来过
        超级鹰那边好垃圾
        """
        driver.close()
        print("fun")
        fun()
    #选择城市与时间

    button=driver.find_element_by_css_selector('[type="button"]')

    from selenium.webdriver.support.ui import Select

    select1=driver.find_element_by_xpath('//select[@id="centerProvinceCity"]')
    s1=Select(select1)

    time.sleep(1)
    select1_optgroup=select1.find_elements_by_xpath('//optgroup[@label]')
    leng=len(select1_optgroup)
    #选择城市
    #如果上面那个try报错，改下下面2个range 换换城市时间
    city_index=random.randint(1,40)
    for a in range(city_index,leng):

        s1.select_by_index(a)
        break
    select2=driver.find_element_by_xpath('//select[@id="testDays"]')

    time.sleep(1)
    s2=Select(select2)
    select2_option=select2.find_elements_by_xpath('//option[@value]')
    leng=len(select2_option)
    date_index=random.randint(1,5)
    for a in range(date_index,leng):

        s2.select_by_index(a)
        break
    # button.send_keys("")
    # button.click()
    # time.sleep(random.uniform(2, 3))
    # driver.execute_script('document.getElementById("btnQuerySeat").click()')
    buttonxy = button.location
    buttonsize = button.size
    import  pyautogui
    bx,by=buttonsize["width"]//2+buttonxy["x"],buttonsize["height"]//2+buttonxy["y"]+100
    pyautogui.moveTo(x=bx, y=by, duration=2, tween=pyautogui.linear)
    pyautogui.click()
    time.sleep(random.uniform(2,3))
    thead = None
    try:
        """
        报错说明托福那个页面在弹出————————”未查询到考位信息“
        """
        thead=driver.find_element_by_xpath('/html/body/div[4]/div/div/div/div[3]/div/div/div[3]/div/div/table/thead')
    except:

        driver.close()
        print("thead")
        fun()
    tr=driver.find_elements_by_xpath('//table[@class="table table-bordered table-striped"]//tr')
    with open('kaoshi.text',mode='w',encoding='utf_8') as f:
        riqi=thead.find_element_by_xpath('./tr[1]/th[1]/span[1]').text
        print(riqi)
        shijian = thead.find_element_by_xpath('./tr[1]/th[1]/span[3]').text
        # shijian1 = thead.find_element_by_xpath('./tr[1]/th[1]/span[3]/span').text
        print(shijian)
        f.write(riqi+";"+shijian+";"+"\n")
        leng=len(tr)
        for a in range(2,leng):
            tds=tr[a].find_elements_by_xpath('./td')
            print(tds)
            city=tds[0].text
            print(city)
            kaodian = tds[1].text
            print(kaodian)
            rmb=tds[2].text
            print(rmb)
            kaowei=tds[3].text
            print(kaowei)
            f.write('城市:'+city+"\t"+"考点："+kaodian+"\t"+"费用RMB:"+rmb+"\t"+"考位"+"\t"+kaowei+"\n")
        return "完成"

ip={"HTTPS":["123.163.97.89","182.34.37.70","59.57.148.229"]}
fun()

