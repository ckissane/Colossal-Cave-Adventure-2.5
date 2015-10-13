var SETUP;
var w = $("body").width();
var h = $("body").height();
$(".output").height(h - 250);
var output = $(".console");
var lastInput;
var FILE = $(".data").html();
var FILESPLIT;
var JKIND=0;
var IKIND=0;
/*
C ADVENTURES
       IMPLICIT INTEGER(A-Z)
       REAL RAN
       COMMON RTEXT,LLINE_TEXT,LLINE_LEN,LLINE_CONT
       CHARACTER*5 A,B,WD2
       CHARACTER*5 ATAB(1000)
       CHARACTER*1 LLINE_TEXT(1000,100)
       DIMENSION IOBJ(300),ICHAIN(100),IPLACE(100),LLINE_CONT(1000)
      1 ,IFIXED(100),COND(300),PROP(100),ABB(300),LLINE_LEN(1000)
      2 ,LTEXT(300),STEXT(300),KEY(300),DEFAULT(300),TRAVEL(1000)
      3 ,TK(25),KTAB(1000),BTEXT(200),DSEEN(10)
      4 ,DLOC(10),ODLOC(10),DTRAV(20),RTEXT(100),JSPKT(100)
      5 ,IPLT(100),IFIXT(100)
      */
var RAN;
var RTEXT, LLINE_TEXT, LLINE_LEN, LLINE_CONT;
//CHARACTER*5
var A, B, WD2;
//CHARACTER*5
var ATAB = {};
//CHARACTER*1
var LLINE_TEXT = {};
//DIMENSION
var IOBJ = {};
var ICHAIN = {};
var IPLACE = {};
var LLINE_CONT = {};
var IFIXED = {};
var COND = {};
var PROP = {};
var ABB = {};
var LLINE_LEN = {};
var LTEXT = {};
var STEXT = {};
var KEY = {};
var DEFAULT = {};
var TRAVEL = {};
var TK = {};
var KTAB = {};
var BTEXT = {};
var DSEEN = {};
var DLOC = {};
var ODLOC = {};
var DTRAV = {};
var RTEXT = {};
var JSPKT = {};
var IPLT = {};
var IFIXT = {};


/*
C READ THE PARAMETERS

       IF(SETUP.NE.0) GOTO 1
       SETUP=1
       KEYS=1
       LAMP=2
       GRATE=3
       ROD=5
       BIRD=7
       NUGGET=10
       SNAKE=11
       FOOD=19
       WATER=20
       AXE=21*/
if (SETUP) {

} else {
    SETUP = 1;
    KEYS = 1;
    LAMP = 2;
    GRATE = 3;
    ROD = 5;
    BIRD = 7;
    NUGGET = 10;
    SNAKE = 11;
    FOOD = 19;
    WATER = 20;
    AXE = 21;
    /*
       DATA(JSPKT(I),I=1,16)/24,29,0,31,0,31,38,38,42,42,43,46,77,71
       1 ,73,75/
       DATA(IPLT(I),I=1,20)/3,3,8,10,11,14,13,9,15,18,19,17,27,28,29
       1 ,30,0,0,3,3/
       DATA(IFIXT(I),I=1,20)/0,0,1,0,0,1,0,1,1,0,1,1,0,0,0,0,0,0,0,0/
       DATA(DTRAV(I),I=1,15)/36,28,19,30,62,60,41,27,17,15,19,28,36
       1 ,300,300/
       */
    JSPKT = [24, 29, 0, 31, 0, 31, 38, 38, 42, 42, 43, 46, 77, 71, 73, 75];
    IPLT = [3, 3, 8, 10, 11, 14, 13, 9, 15, 18, 19, 17, 27, 28, 29, 30, 0, 0, 3, 3];
    IFIXT = [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    DTRAV = [36, 28, 19, 30, 62, 60, 41, 27, 17, 15, 19, 28, 36, 300, 300];
    /*
       DO 1001 I=1,300
       STEXT(I)=0
       IF(I.LE.200) BTEXT(I)=0
       IF(I.LE.100)RTEXT(I)=0
1001   LTEXT(I)=0*/
    for (var I = 1; I < 301; I++) {
        STEXT[I] = 0;
        if (I < 201) {
            BTEXT[I] = 0
        }
        if (I < 101) {
            RTEXT[I] = 0
        }
        LTEXT[I] = 0;
    }

    /* I=1
       OPEN (1,FILE='advdat31.dat')
1002   READ(1,1003) IKIND*/
    FILESPLIT = FILE.split("\n");
   //console.log(FILESPLIT);
    var I = 1;
    DO1002();
   //console.log(LLINE_TEXT);
   SPEAK(1);
/*
1003   FORMAT(I7)
       GOTO(1100,1004,1004,1013,1020,1004,1004)(IKIND+1)*/
    function DO1002() {
        
        IKIND = parseInt((FILESPLIT.splice(0, 1)[0]+"      ").substr(0, 7));
        console.log(IKIND);
        if (IKIND == 0) {
            DO1100();
        }
        if (IKIND == 1) {
                DO1004();
        }
        if (IKIND == 2) {
            DO1004();
        }
        if (IKIND == 3) {
            DO1013();
        }
         if (IKIND == 4) {
            DO1020();
        }
         if (IKIND == 5) {
            DO1004();
        }
         if (IKIND == 6) {
            DO1004();
        }

    }

    
       /*
1004   READ(1,1005)JKIND,(LLINE_TEXT(I,J),J=1,100)
1005   FORMAT(1I7,100A)
       IF(JKIND.EQ.-1) GOTO 1002
       DO 1006 K=1,100
       KK=K
       IF(LLINE_TEXT(I,101-K).NE.' ') GOTO 1007
1006   CONTINUE
       STOP*/
function DO1004(){
    
    var READLINE = FILESPLIT.splice(0, 1)[0];
    //console.log(READLINE);
            JKIND = eval(READLINE.substr(0, 7));
            LLINE_TEXT[I] = READLINE.substr(7, READLINE.length);
            if(LLINE_TEXT[I].substr(LLINE_TEXT[I].length-1, 1)!=' '){
                DO1007();
            }
}

    /*
1007   LLINE_LEN(I)=100-KK+1
       LLINE_CONT(I)=0
       IF(IKIND.EQ.6)GOTO 1023
       IF(IKIND.EQ.5)GOTO 1011
       IF(IKIND.EQ.1) GOTO 1008
       IF(STEXT(JKIND).NE.0) GOTO 1009
       STEXT(JKIND)=I
       GOTO 1010
*/
function DO1007(){
    //console.log("DO1007");
    LLINE_CONT[I]=0
    if(IKIND==6){
        DO1023();
    }else if(IKIND==5){
        DO1011();
    }else if(IKIND==1){
        DO1008();
    }else if(STEXT[JKIND]!=0){
        DO1009();
    }else{
    STEXT[JKIND]=I;
    DO1010();
    }
}
/*
1008   IF(LTEXT(JKIND).NE.0) GOTO 1009
       LTEXT(JKIND)=I
       GOTO 1010*/
       function DO1008(){
           if(LTEXT[JKIND]!=0){
               DO1009();
           }else{
               LTEXT[JKIND]=I;
               DO1010();
           }
       }
       /*
1009   LLINE_CONT(I-1)=I
*/
function DO1009(){
    LLINE_CONT[I-1]=I;
     DO1010();
}
/*
1010   I=I+1
       IF(I.NE.1000)GOTO 1004
       PAUSE 'TOO MANY LINES'
       */
     function  DO1010(){
           I=I+1;
           if(I!=1000){
               DO1004();
           }else{
           console.log("TOO MANY LINES");
           DO1011();
           }
       }
       /*

1011   IF(JKIND.LT.200)GOTO 1012
       IF(BTEXT(JKIND-100).NE.0)GOTO 1009
       BTEXT(JKIND-100)=I
       BTEXT(JKIND-200)=I
       GOTO 1010*/
       function DO1011(){
           if(JKIND<200){
               DO1012();
           }else if(BTEXT(JKIND-100)!=0){
               DO1009();
           }else{
               BTEXT[JKIND-100]=I;
                BTEXT[JKIND-200]=I;
                DO1010();
           }
       }
       /*
1012   IF(BTEXT(JKIND).NE.0)GOTO 1009
       BTEXT(JKIND)=I
       GOTO 1010
*/
function DO1012(){
    if(BTEXT[JKIND]!=0){
        DO1009();
    }else{
        BTEXT[JKIND]=I;
        DO1010();
    }
}
/*
1023   IF(RTEXT(JKIND).NE.0) GOTO 1009
       RTEXT(JKIND)=I
       GOTO 1010
*/
function DO1023(){
    if(RTEXT[JKIND]!=0){
        DO1009();
    }else{
        RTEXT[JKIND]=I;
        DO1010();
    }
}
/*
1013   I=1
1014   READ(1,1015)JKIND,LKIND,(TK(L),L=1,10)
1015   FORMAT(12I7)
       IF(JKIND.EQ.-1) GOTO 1002
       IF(KEY(JKIND).NE.0) GOTO 1016
       KEY(JKIND)=I
       GOTO 1017
1016   TRAVEL(I-1)=-TRAVEL(I-1)
1017   DO 1018 L=1,10
       IF(TK(L).EQ.0) GOTO 1019
       TRAVEL(I)=LKIND*1024+TK(L)
       I=I+1
       IF(I.EQ.1000) STOP
1018   CONTINUE
1019   TRAVEL(I-1)=-TRAVEL(I-1)
       GOTO 1014
       */
       function DO1013(){
           console.log("1013");
           I=1;
           var READLINE = FILESPLIT.splice(0, 1)[0];
    //console.log(READLINE);
            JKIND = eval(READLINE.substr(0, 7));
            if(JKIND==-1){
                DO1002();
            }else{
            LKIND = eval(READLINE.substr(7, 14));
            var smallL=1;
            for(L=14;L<14+7*10;L+=7){
                smallL++;
                TK[smallL]=READLINE.substr(L, L+7);
            }
            if(KEY[JKIND]){
                DO1016();
            }else{
                KEY[JKIND]=I;
                DO1017();
            }
            }
       }
       function DO1016(){
           TRAVEL[I-1]=-TRAVEL[I-1];
       }
       
/*
1020   DO 1022 IU=1,1000
       READ(1,1021) KTAB(IU),ATAB(IU)
1021   FORMAT(I7,A5)
       IF(KTAB(IU).EQ.-1)GOTO 1002
1022   CONTINUE
       PAUSE 'TOO MANY WORDS'
*/

    function DO1020() {
        DO1022();
    }

    function DO1022() {
        for (var IU = 0; IU < 1000; I++) {
            var READLINE = FILESPLIT.splice(0, 1)[0];
            KTAB[IU] = eval(READLINE.substr(0, 7));
            ATAB[IU] = READLINE.substr(7, READLINE.length);
            if (KTAB[IU] == -1) {
                console.log("TOO MANY WORDS");
                break;
            }
        }
    }



    /*
C TRAVEL = NEG IF LAST THIS SOURCE + DEST*1024 + KEYWORD

C COND  = 1 IF LIGHT,  2 IF DON T ASK QUESTION




*/
    /*
1100   DO 1101 I=1,100
       IPLACE(I)=IPLT(I)
       IFIXED(I)=IFIXT(I)
1101   ICHAIN(I)=0
*/

    function DO1100() {
        console.log("1100");
        for (var I = 1; I < 101; I++) {
            IPLACE[I] = IPLT[I];
            IFIXED[I] = IFIXT[I];
            ICHAIN[I] = 0;
        }
    }
    /*
       DO 1102 I=1,300
       COND(I)=0
       ABB(I)=0
1102   IOBJ(I)=0
       DO 1103 I=1,10
1103   COND(I)=1
       COND(16)=2
       COND(20)=2
       COND(21)=2
       COND(22)=2
       COND(23)=2
       COND(24)=2
       COND(25)=2
       COND(26)=2
       COND(31)=2
       COND(32)=2
       COND(79)=2

       DO 1107 I=1,100
       KTEM=IPLACE(I)
       IF(KTEM.EQ.0)GOTO 1107
       IF(IOBJ(KTEM).NE.0) GOTO 1104
       IOBJ(KTEM)=I
       GO TO 1107
1104   KTEM=IOBJ(KTEM)
1105   IF(ICHAIN(KTEM).NE.0) GOTO 1106
       ICHAIN(KTEM)=I
       GOTO 1107
1106   KTEM=ICHAIN(KTEM)
       GOTO 1105
1107   CONTINUE
       IDWARF=0
       IFIRST=1
       IWEST=0
       ILONG=1
       IDETAL=0
       PAUSE 'INIT DONE'


*/
}




/*
SUBROUTINE YES(X,Y,Z,YEA)
       IMPLICIT INTEGER(A-Z)
       CHARACTER*5 IA1,IB1,JUNK2
       CALL SPEAK(X)
       CALL GETIN(JUNK,IA1,JUNK2,IB1)
       IF(IA1.EQ.'NO'.OR.IA1.EQ.'N') GOTO 1
       YEA=1
       IF(Y.NE.0) CALL SPEAK(Y)
       RETURN
1      YEA=0
       IF(Z.NE.0)CALL SPEAK(Z)
       RETURN
       END
*/

function YES(X, Y, Z, YEA) {
    var IA1, IB1, JUNK2, JUNK;
    SPEAK(X);
    GETIN(JUNK, IA1, JUNK2, IB1);
    while (JUNK != 2) {

    }
    if (IA1 == "NO" || IA1 == "N") {
        YEA = 1
        if (Z != null) {
            SPEAK(Z)
        };
    } else {
        YEA = 1
        if (Y != null) {
            SPEAK(Y)
        };
    }
}
/*
SUBROUTINE SPEAK(IT)
       IMPLICIT INTEGER(A-Z)
       COMMON RTEXT,LLINE_TEXT,LLINE_LEN,LLINE_CONT
       DIMENSION RTEXT(100),LLINE_CONT(1000),LLINE_LEN(1000)
       CHARACTER*1 LLINE_TEXT(1000,100)

       KKT=RTEXT(IT)
       IF(KKT.EQ.0)RETURN
999    PRINT 998, (LLINE_TEXT(KKT,JJT),JJT=1,LLINE_LEN(KKT))
998    FORMAT(100A)
       KKT=KKT+1
       IF(LLINE_CONT(KKT-1).NE.0)GOTO 999
997    PRINT 996
996    FORMAT(/)
       RETURN
       END
*/

function SPEAK(IT) {
    var KKT = RTEXT[IT];

    if (!KKT) {
        return
    };
    while (LLINE_CONT[KKT]) {
        
        output.html(output.html() + "<li class='log'>" + LLINE_TEXT[KKT] + "</li>");
        KKT = KKT + 1;
    }


}
/*
SUBROUTINE GETIN(TWOW,B,C,D)
       IMPLICIT INTEGER(A-Z)
       CHARACTER*5 A(5),B,C,D
       CHARACTER*1 UPCASE
6      READ (UNIT=*,FMT=1) (A(I),I=1,4)
1      FORMAT(4A5)
       TWOW=0
       S=0
       DO 7 J=1,4
       DO 7 K=1,5
       A(J)(K:K) = UPCASE(A(J)(K:K))
7      CONTINUE
       B=A(1)
       DO 2 J=1,4
       DO 2 K=1,5
       IF (A(J)(K:K).EQ.' ') GOTO 3
       IF(S.EQ.0)GOTO 2
       TWOW=1
       C(1:6-K) = A(J)(K:5)
       IF (K.NE.1) C(6-K+1:5) = A(J+1)(1:K-1)
       GOTO 4
3      IF(S.EQ.1)GOTO 2
       S=1
       IF (J.NE.1) GOTO 2
       DO 5 L=K,5
       B(L:L)=' '
5      CONTINUE
2      CONTINUE
4      D=A(2)
       RETURN
       END
*/

function GETIN(TWOW, A, B, C) {
    TWOW = 0;
    var A = [];
    var B, C, D;
    $(".input").val("");
    while (lastInput == null) {

    }


}
/*

       FUNCTION RAN(I)
C     Rand is often quite poor, should replace this -- MTR
       INTEGER I
       RAN = Rand(0)
       RETURN
       END

       FUNCTION UPCASE(CH)
       CHARACTER*1 CH,UPCASE
       INTEGER CODE
       CODE=IAChar(CH)
       IF (CODE.GE.97.AND.CODE.LE.122) CODE = CODE - 32
       UPCASE=AChar(CODE)
       RETURN
       END

*/