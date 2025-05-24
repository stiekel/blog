---
title: 软考程序员应用技术科目（下午考试）题目总结
date: 2025-05-24 06:47:22
categories:
  - 考试
tags:
  - 软考
---

程序员考试的应用技术科目，在之前使用笔试考试时考试是在下午进行，也叫“下午考试”。一共六个题目，前四个为必做题，后面两个题为二选一，各题题目如下：

- 第 1 题：流程图填空题，一般是伪代码填空
- 第 2 至第 4 题，C 语言程序代码题
- 最后两题：均为面向对象编程题，二选一，根据语言分为 C++和 Java 题。

本文中，使用 `202011-4` 表示 2020 年下半年考试中应用技术的第 4 题，考试原题参考[这里](https://ebook.qicoder.com/%E7%A8%8B%E5%BA%8F%E5%91%98/notes/2020%E5%B9%B4%E7%A8%8B%E5%BA%8F%E5%91%98%E8%80%83%E8%AF%95%E4%B8%8B%E5%8D%88%E7%9C%9F%E9%A2%98%EF%BC%88%E4%B8%93%E4%B8%9A%E8%A7%A3%E6%9E%90+%E5%8F%82%E8%80%83%E7%AD%94%E6%A1%88%EF%BC%89.html)。

## 第 1 题：流程图

### 样题

#### 202011-1

下面流程图所示算法的功能是：在一个二进制位串中，求出连续的“1”构成的所有子串的最大长度 M。例如，对于二进制位串 0100111011110，M=4。

该算法中，将长度为 n 的二进制位串的各位数字，按照从左到右的顺序依次存放在数组 A[1..n]。在对各个二进制位扫描的过程中，变量 L 动态地记录连续“1”的个数。

<img src="/upfile/2025/05/programmer-202011-1.png" height="400" />

```txt
(1) 0
(2) L+1或等效形式
(3) 0→L或等效形式
(4) L>M或L≥M或等效形式
(5) M
```

#### 201811-1

设[a1b1]，[a2，b2]，...，[an，bn]是数轴上从左到右排列的 n 个互不重叠的区间（a1 < b1 < a2 < b2... < an < bn ）。以下流程图将一个新的区间[A，B]（A < B）添加到上述区间集，形成新的从左到右排列的若干个互不重叠的区间（若 A、B 落在原有的两个区间，则以原有区间最左端点和最右端点为基准，形成新的区间），最后依次输出这些区间的端点。
例如，给定区间集：[1，2]，[4，6]，[8，10]，[13，15]，[17，20]，添加区间[5，14]后，依次输出 1，2，4，15，17，20，表示合并后的区间集：[1，2]，[4，15]，[17，20]。
该流程图采用的算法是：先在 a1，b1，a2，b2，...，an，bn 中扫描定位 A 点，再继续描定位 B 点，在扫描过程中随时输出已确定的区间的端点值。

<img src="/upfile/2025/05/programmer-201811-1.png" height="400" />

```txt
(1) A
(2) ai
(3) bi
(4) A，B
(5) B
```

## 第 2 至 4 题：代码填空题

主要考查形式包括以下几种：

- 给出代码运行结果
- 填写各种边界条件、判断条件
- 考查 C 语言中基本函数用法，比如 `scanf` （201805-4） `fabs`（202011-2）
- 自定义函数的调用
- 指针的使用
- 链表的使用

### 运行结果题

题目给出代码，问题给定输出，答案预测输出。代表题目有：

- 201905-1
- 201805-3
- 201711-2

#### 201811-2

阅读以下 C 代码，回答问题 1 和问题 2，将解答填入答题纸的对应栏内。

```c
// 【C代码1】
#include <stdio.h>
#include <stdlib.h>

int main()
{
        int a,tmp,b=0;
        scanf("%d",&a);
        tmp=a<0?-a:a;

        while(tmp){
                b=b*10+tmp%10;
                tmp=tmp/10;
        }

        if(a==b||-a==b)
                   printf("Palindromic number.\n");

        printf("a=%d b=%d\n",a,b);

        return 0;
}

// 【C代码2】
#include <stdio.h>

int main()
{
    char grade;
    int points;

    for(grade='A';grade<'F';grade++){
            switch(grade){
                    case 'A':points=4;break;
                    case 'B':points=3;
                    case 'C':points=2;
                    case 'D':points=1;break;
                    case 'E':
                    case 'W':points=0;
            }
            if(points>0)
                    printf("Passed,point=%d\n",points);
            else
                    printf("Failed\n");
        }
    return 0;
}
```

【问题 1】
写出【C 代码 1】运行时分别输入-1331、795 的输出结果。

【问题 2】
写出【C 代码 2】运行时的输出结果。

```txt
【问题1】
  输入-1331的结果是：
Palindromic number.
a=-1331 b=1331
输入795的结果是：
a=795 b=597
【问题2】
  输出结果是：
Passed,point=4
Passed,point=1
Passed,point=1
Passed,point=1
Failed
```

### 填写各种边界条件、判断条件

这类题目很多，或者说大部分题目都涉及到这个考点，但对应真正写过代码的人来讲也是最简单的题目。

- 201811-3
- 201811-4
- 201905-3
- 201905-4
- 201711-2

#### 201811-3

【说明】
某地电价分三档：
（1）当月用电量不超过 180 度时，每度电 0.5 元：
（2）当月用电量超出 180 度但不超过 360 度的部分，每度电 0.55 元：
（3）当月用电量超过 360 度的部分，每度电 0.7 元。
例如，某户 A 一个月的用电量为 150 度，其电费为 150*0.5=75.00 元；某户 B 用电量为 280 度，其电费为 180*0.5+（280-180）*0.55=145.00 元；某户 C 用电量为 450 度，其电费为 180*0.5+（360-180）*0.55+（450-360）*0.7=90.0+99.0+63.0=252.00 元。

下面程序运行时读入 m（m>0）个住户某月的用电量，计算该月每户应缴的电费并输出，同时找出这 m 个住户中该月的最大用电量和最小用电量。

```c
// 【C代码】
#include<stdio.h>
#define MAXQT 100000 //用电的最大量
double proc(int qt)
{              //计算并返回月用电量为qt时的电费
    double fee=0.0;
    if(       (1)      ) // qt <= 180
            fee=qt*0.5;
    else  if  (    (2)      ) // qt <= 360
             fee=180*0.5+(qt-180)*0.55;
    else
             fee= (3) ; // 180 * 0.5 + (360-180) * 0.55 + ( qt - 360 ) * 0.7 或 0.7 * qt - 63
    return fee;
}

int main()
{
    int m ;              //住户数
    int qt , minimun = MAXQT , maximum = 0 ;             //用电量，最小用电量，最大用电量
    scanf( "%d",&m);

    while(m>0){
        scanf( "%d" , &qt ) ;
        if(qt<0 ‖ qt>MAXQT )   continue ;
        printf( "%.21f\n ",   proc(qt) ) ;
        if(     (4)    ) // minimum>qt
            minimum=qt;
        else if(     (5)       ) // maximum<qt
                maximum=qt;
         (6)     ; // m--
    }

    printf( "maximum=%d,minimum=%d\n ",maximum,minimum);
    return 0;
}
```

答案

```txt
(1) qt<=180
(2) qt<=360
(3) 180 * 0.5 + (360-180) * 0.55 + ( qt - 360 ) * 0.7 或 0.7 * qt - 63
(4) minimum>qt
(5) maximum<qt
(6) m--
```

### 考查 C 语言中基本函数用法

需要对 C 语言或者类 C 语言有一定了解才更有助于作答。

- `fabs`（202011-2）
- `scanf` （201805-4）

#### 202011-2

<img src="/upfile/2025/05/programmer-202011-2.png" height=90 />
<img src="/upfile/2025/05/programmer-202011-2-2.png" height=400 />

答案

```txt
(1) fabs(x)<=1e-6 或fabs(x)<=0.00001x==0.0或等效形式
(2) x2
(3) x/(x1*x1)或等效形式
(4) (x2-x1)/x1或等效形式
(5) x+=0.1或x=x+0.1或等效形式
```

#### 201805-4

【说明】
下面的 C 代码在输入的 100 个英文单词中找出最小单词和最大单词。约定每个单词是仅由英文字母构成的字符串，且都不超过 20 个字符。单词的大小按照字典序定义。例如，单词“entry”大于“enter”、“art”小于“ article”、“an”等于“An”。

```c
include <stdio.h>
define NUMBER 100
int isValid(const char s1);                  //若字符串s1仅包含英文字母则返回1，否则返回0
char toLower(char ch);                       //将大写字母转换为小写字母
int usr_strcmp(char s1, char s2);    //比较字符串s1和s2，相等时返回0,
                                                            //s1大则返回正整数，s1小则返回负整数
void usr_strcpy(char s1,const char s2);     //字符串s2拷贝给s1

int main()
{
    char word[32];
    char maxWord[32]="", minWord[32] ="";
    int numWord=0;
    while(numWord < NUMBER) {
      // word
         scanf("%s",    （1）    );                                 // 输入一个单词存入word
         if(isValid(word))     {
              if (0==numWord) {usr_strcpy(minWord,word);usr_strcpy(maxWord,word);}
              numWord++;
              // usr_strcmp(word, maxWord)
              if(         （2）       >0)                              // 调用usr_strcmp比较单词
                   usr_strcpy(maxWord, word);      // 用maxWord记下最大单词
              else
              // usr_strcmp(word, minWord)
                   if(       （3）      <0)                     // 调用usr_strcmp比较单词
                        usr_strcpy(minWord,word); // 用minWord记下最小单词
            }
      }
      printf("maxWord=%s   minWord=%s\n",maxWord,minWord);
      return 0;
}
int isValid(const chars)
{
     for(; s ; s++)
         if(!(s>='a' && s<='z') && !(s>='A' && s<='Z'))
             return 0;
     return 1;
 }

char toLower(char ch)
{     //若ch为大写字母则返回其小写形式，否则直接返回原字符
      if(ch>='A' && ch<='Z')
                 ch=         （4）         +'a'; // ch-'A'
      return ch;
}

int usr_strcmp(char s1,char s2)
{    //按字典序比较两个英文单词，若s1表示的单词大，则返回正整数，
     //若s1表示的单词小，则返回负整数；否则返回0

     for(;    （5）    ;) { // s1 != '\0' && s2 != '\0' 或 s1 || s2 等价表示
              if(toLower(s1)==toLower(s2))    {s1++,s2++;}
              else
                    break;
      }
     return(toLower(s1) - toLower(s2));
}

void usr_strcpy(char s1,const char s2)
{    //将s2表示的字符串复制给s1
       for(;       （6）       ;) // s2 != '\0' 或 s2 等价表示
            s1++= s2++;
       s1='\0';
}
```

答案

```txt
（1）word
（2）usr_strcmp(word, maxWord)
（3）usr_strcmp(word, minWord)
（4）ch-'A'
（5）s1!='\0'&&s2!='\0'或s1||s2等价表示
（6）s2!='\0'或s2等价表示
```

### 指针、链表的使用

- 202011-3
- 202011-4
- 201705-4
- 201511-4

#### 201511-4

函数 GetListElemPtr(LinkList L，int i)的功能是查找含头结点单链表的第 i 个元素。若找到，则返回指向该结点的指针，否则返回空指针。
函数 DelListElem(LinkList L，int i，ElemType \*e) 的功能是删除含头结点单链表的第 i 个元素结点，若成功则返回 SUCCESS ，并由参数 e 带回被删除元素的值，否则返回 ERROR 。
例如，某含头结点单链表 L 如图 4-1 （a） 所示，删除第 3 个元素结点后的单链表如 图 4-1 （b）所示。

<img src="/upfile/2025/05/programmer-201511-4.png" height=200 />

```c
#define  SUCCESS   0
#define  ERROR    -1

typedef int Status;
typedef int ElemType;

// 链表的结点类型定义如下:

typedef struct Node{
                ElemType data;
                struct Node  next;
}Node ,LinkList;
// 【C 代码】
LinkList  GetListElemPtr(LinkList  L ，int  i)
{ // L是含头结点的单链表的头指针，在该单链表中查找第i个元素结点:
  //   若找到，则返回该元素结点的指针，否则返回NULL
          LinkList  p;
          int   k;      // 用于元素结点计数

          if  (i<1  ∣∣ !L  ∣∣  !L->next)  return NULL;

          k  =  1;   P  =  L->next;          // 令p指向第1个元素所在结点/
          // k<i
          while (p &&             （1）       ) {  // 查找第i个元素所在结点/
                          （2）       ;  ++k; // p = p->next
          }
          return p;
}

Status  DelListElem(LinkList  L ，int i ，ElemType  e)
{   // 在含头结点的单链表L中，删除第i个元素，并由e带回其值/

          LinkList  p，q;

          // 令p指向第i个元素的前驱结点/
          if (i==1)
                     （3）      ； // p=L
          else
                p = GetListElemPtr(L ，i-1);

          if (!p ∣∣ !p->next)       return ERROR; // 不存在第i个元素/
          // p->next
          q =      (4)     ；            // 令q指向待删除的结点/
          p->next = q->next;     // 从链表中删除结点/
          // *e = q->data
                 (5)        ；              // 通过参数e带回被删除结点的数据*/
          free(q);
          return  SUCCESS;
}
```

答案

```txt
（1） k<i
（2）p = p->next
（3）p=L
（4）p->next
（5）*e = q->data
```

#### 201705-4

【说明】
简单队列是符合先进先出规则的数据结构，下面用不含有头结点的单向循环链表表示简单队列。
函数 EnQueue（Queue Q，KeyType new_elem） 的功能是将元素 new_elem 加入队尾。
函数 DnQueue（Queue Q，KeyType \*elem）的功能使将非空队列的队头元素出队（从队列中删除），并通过参数带回刚出队的元素。
用单向循环链表表示的队列如图 4-1 所示。

<img src="/upfile/2025/05/programmer-201705-4.png" height=150 />

```c
// 队列及链表结点等相关类型定义如下：
enum {ERROR, OK};
typedef int KeyType;

typedef struct    QNode{
      KeyType   data;
      Struct QNodenext;
}QNode,LinkQueue;

Typedef struct{
      int  size;
      Link:Queue rear;
} Queue;

// 【C函数】

int EnQueue(QueueQ,KeyType new_elem)
{   //元素new_elem 入队列
     QNodep;
     p=(QNode)malloc(sizeof(QNode));
     if（!p）
        return ERROR;
    p->data=new_elem;
    if（Q->rear）{
        p->next=Q->rear->next;
        （   1   ）; // Q→rear→next=p
     }
     else
         p->next=p;
     ﹙  2  ﹚; // Q→rear=p
     Q->size++;
    return OK;
}

int  DeQueue(QueueQ,KeyTypeelem)
{   //出队列
     QNodep;
     If(0＝＝Q->size) //是空队列
         Return ERROR；
    // Q→rear→next
     p=（  3  ）;   //令p指向队头元素结点
     *elem =p->data;
     // p→next
     Q->rear->next=（  4   ）;   //将队列元素结点从链表中去除
     // Q→rear==p 或 Q→rear→next==p或p→next==p 或 Q→size==1
     if（（  5  ））  //被删除的队头结点是队列中唯一结点
        Q->rear=NULL; //变成空队列
     free（p）;
     Q->size--;
     return OK;
}
```

答案

```txt
（1）Q→rear→next=p
（2）Q→rear=p
（3）Q→rear→next
（4）p→next
（5）Q→rear==p 或 Q→rear→next==p或p→next==p 或 Q→size==1
```

## 第 5、6 题：面向对象编程

第 5 题为 Java 题，第 6 题为 C++ 题，一般考察面向对象各种关键字的使用。例如：

- extends
- super
- abstract
- implements
- void

还可能会用到类的定义、实例化、类型定义。

本解析只收集 Java 题目，对于日常不使用这两个语言的程序员来讲，Java 显然更容易，而使用 C++ 的人也不需要看这篇文章。

#### 202011-5

在线购物系统需提供订单打印功能，相关类及关系如图 5-1 所示，其中类 Order 能够完成打印订单内容的功能，类 HeadDecorator 与 FootDecorator 分别完成打印订单的抬头和脚注的功能。

<img src="/upfile/2025/05/programmer-202011-5-1.png" height=250 />
<br />
<img src="/upfile/2025/05/programmer-202011-5-2.png" height=600 />

答案

```txt
(1) extends
(2) this.order
(3) super(order)
(4) super(order)
(5) super.printOrder()
(6) extends
(7) this.order
```

#### 201811-5

以下 Java 代码实现一个简单乐器系统，音乐类（Music）可以使用各类乐器（Instrument）进行演奏和调音等操作。对部分乐器进行建模，其类图如图 5-1 所示，包括：乐器（Instrument）、打击乐器（Percussion）、弦乐器（Stringed）、管乐器（Wind）、木管乐器（Woodwind）、铜管乐器（Brass）。

<img src="/upfile/2025/05/programmer-2018011-5.png.png" height=300 />

```java
import java.util.ArrayList;

enum Note{               /*枚举各种音调*/
MIDDLE_C,C_SHARP,B_FLAT;       //其它略
}

abstract class Instrument{        /*乐器*/
    // abstract void play(Note n)
    （1）   ;               //play方法
    abstract void adjust() ;         //adjust抽象方法
}

class Wind ( 2 )   { // extends Instrument

    public void play(Note n){System.out.println( "Wind.play() "+n);}
    public viod adjust(){System.out.println( "Wind.adjust() ");}
}

/*类Percussion 和Stringed实现代码；略*/

class Brass     (3)      { // extends Wind
    public void play(Note n){System.out.println( "Brass.play() "+n);}
    public void adjust(){System.out.println( "Brass.adjust() ");}
}

class Woodwind extends Wind {
    public void play(Note n){System.out.println( "Woodwind.play() "+n);}
}

public class Music {

    void tune(Instrument i){i.play(Note.MIDDlE_C);}

    void adjust(Instrument i){i.adjust();}

    void tuneAll(    ( 4 )    e)    { // ArrayList<Instrument>
        for(int j=0;j<e.size():j++)    {
            Instrument i=e.get(j);
            adjust(i);
            tune(i);
            }
    }

public static void main(String[]args)

    {
        ( 5 )  music=new Music() ; // Music
        ArrayList<Instrument>orchestra=new ArrayList<>();
        orchestra.add(new Wind());
        orchestra.add(new Woodwind());
        music.tuneAll(orchestra);
    }
}
```

答案（为了方便这里补全了完整代码行）

```txt
(1) abstract void play(Note n)
(2) class Wind extends Instrument {}
(3) class Brass extends Wind {}
(4) void tuneAll(ArrayList<Instrument> e)
(5) Music music=new Music()
```

#### 201805-5

以下 Java 代码实现一个简单绘图工具，绘制不同形状以及不同颜色的图形。部分接口、类及其关系如图 5－1 所示。

<img src="/upfile/2025/05/programmer-2018005-5.png" height=200 />

```java
interface DrawCircle {     //绘制圆形
      public     （1）    ； // void drawCircle (int radius,int x,int y)
}

class RedCircle implements DrawCircle {    //绘制红色圆形
       public void drawCircle(int radius,int x, int y)  {
             System.out.println("Drawing Circle[red,radius:" + radius + ",x:" + x + ",y:" +y+ "]");
       }
}

class GreenCircle implements DrawCircle {    //绘制绿色圆形
      public void drawCircle(int radius, int x, int y) {
            System.out.println("Drawing Circle[green,radius:" +radius+ ",x: " +x+ ",y: " +y+ "]");
      }
}
abstract class Shape {    //形状
       protected      （2）   ; // DrawCircle drawCircle

       public Shape(DrawCircle drawCircle) {
             this.drawCircle = drawCircle;
        }
        public abstract void draw();
}

class Circle extends Shape {    //圆形
       private int x,y,radius;

       public Circle(int x,int y,int radius,DrawCircle drawCircle) {
            （3）   ; // super(drawcircle)
            this.x = x;
            this.y = y;
            this.radius = radius;
       }

       public void draw() {
            drawCircle.     （4）    ; // drawCircle(radius,x,y)
       }
}

public class DrawCircleMain {
      public static void main(String[] args) {
        // new RedCircle()
        Shape redCircle＝new Circle( 100,100,10,      （5）      )；//绘制红色圆形
        // new GreenCircle()
        Shape greenCircle＝new Circle(200,200,10,      （6）     )；//绘制绿色圆形

        redCircle.draw();
        greenCircle.draw();
     }
}
```

答案

```txt
（1）void drawCircle (int radius,int x,int y)
（2）DrawCircle drawCircle
（3）super(drawcircle)
（4）drawCircle(radius,x,y)
（5）new RedCircle()
（6）new GreenCircle()
```
