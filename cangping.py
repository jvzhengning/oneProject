from selenium import webdriver
driver=webdriver.Chrome(executable_path='../chromedriver.exe')
driver.get('https://www.baidu.com')
kw=driver.find_element_by_xpath('//input[@id="kw"]')
xinghao="N/A"
pingpai="欧司朗"
desc="照明光源[250W]"

xinghao2="N/A"
pingpai2="深圳市图腾通讯科技有限公司"
desc2="磁盘阵列[2T]"

xinghao3="KX-TG80CN(黑色)"
pingpai3="日本松下公司"
desc3="电话机[KX-TG80CN(黑色)]"

kw.send_keys(xinghao3+" "+pingpai3+" "+desc3)
su=driver.find_element_by_xpath('//input[@id="su"]')
su.click()

import time,re
time.sleep(2)
def fun():
    a_lis = driver.find_elements_by_xpath('//div[@id="content_left"]//h3/a[1]')
    xia_a = driver.find_element_by_link_text("下一页>")
    for a in a_lis:
        href=a.get_attribute("href")
        print(href)
        if "panasonic" in href:
            a.click()
            print(href)
            time.sleep(1)
            phone=re.findall("^1[3-9]{1}[1-9]{9}$",driver.page_source)
            email=re.findall("^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$",driver.page_source)
            print(phone,email)
            if phone or email:
                print(phone,email)
                return
            else:
                driver.back()
                time.sleep(1)

    xia_a.click()
    time.sleep(2)
    fun()
fun()




