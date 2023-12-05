import pandas as pd

df = pd.read_excel('지역코드 추가.xlsx')


def add_code(x):
    if '남원읍' in x:
        code=0
    elif '대정읍' in x:
        code=1
    elif '성산읍' in x:
        code=2
    elif '안덕면' in x:
        code=3
    elif '표선면' in x:
        code=4
    elif '구좌읍' in x:
        code=6
    elif '애월읍' in x:
        code=7
    elif '조천읍' in x:
        code=8
    elif '한경면' in x:
        code=9
    elif '한림읍' in x:
        code=10
    elif '우도' in x:
        code=2
    elif '서귀포시' in x:
        code=5
    else:
        code=11
    
    return int(code)

df['area_code'] = df['도로명주소'].apply(lambda x: add_code(str(x)))

df.to_excel('tmapPlusAreaCode.xlsx', encoding='utf-8')