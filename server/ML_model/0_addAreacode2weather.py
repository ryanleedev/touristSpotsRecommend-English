import pandas as pd


# def add_code(x):
#     if '남원읍' in x:
#         code=0
#     elif '대정읍' in x:
#         code=1
#     elif '성산읍' in x:
#         code=2
#     elif '안덕면' in x:
#         code=3
#     elif '표선면' in x:
#         code=4
#     elif '구좌읍' in x:
#         code=6
#     elif '애월읍' in x:
#         code=7
#     elif '조천읍' in x:
#         code=8
#     elif '한경면' in x:
#         code=9
#     elif '한림읍' in x:
#         code=10
#     elif '우도' in x:
#         code=2
#     elif '서귀포시' in x:
#         code=5
#     else:
#         code=11

area0 = pd.read_csv('./날씨 데이터/남원읍_WeatherData.csv')
area0['area_code'] = 0
area0.to_excel('weatherAreaCode0.xlsx')

area1 = pd.read_csv('./날씨 데이터/대정읍_마라도포함_WeatherData.csv')
area1['area_code'] = 1
area1.to_excel('weatherAreaCode1.xlsx')

area2 = pd.read_csv('./날씨 데이터/성산읍_WeatherData.csv')
area2['area_code'] = 2
area2.to_excel('weatherAreaCode2.xlsx')

area3 = pd.read_csv('./날씨 데이터/안덕면_WeatherData.csv')
area3['area_code'] = 3
area3.to_excel('weatherAreaCode3.xlsx')

area4 = pd.read_csv('./날씨 데이터/표선면_WeatherData.csv')
area4['area_code'] = 4
area4.to_excel('weatherAreaCode4.xlsx')

area5 = pd.read_csv('./날씨 데이터/대륜동_WeatherData.csv')
area5['area_code'] = 5
area5.to_excel('weatherAreaCode5.xlsx')

area6 = pd.read_csv('./날씨 데이터/구좌읍_WeatherData.csv')
area6['area_code'] = 6
area6.to_excel('weatherAreaCode6.xlsx')

area7 = pd.read_csv('./날씨 데이터/애월읍_WeatherData.csv')
area7['area_code'] = 7
area7.to_excel('weatherAreaCode7.xlsx')

area8 = pd.read_csv('./날씨 데이터/조천읍_WeatherData.csv')
area8['area_code'] = 8
area8.to_excel('weatherAreaCode8..xlsx')

area9 = pd.read_csv('./날씨 데이터/한경면_WeatherData.csv')
area9['area_code'] = 9
area9.to_excel('weatherAreaCode9.xlsx')

area10 = pd.read_csv('./날씨 데이터/한림읍_WeatherData.csv')
area10['area_code'] = 10
area10.to_excel('weatherAreaCode10.xlsx')

area11 = pd.read_csv('./날씨 데이터/아라동_WeatherData.csv')
area11['area_code'] = 11
area11.to_excel('weatherAreaCode11.xlsx')






