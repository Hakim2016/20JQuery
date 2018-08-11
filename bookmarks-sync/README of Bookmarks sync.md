#Bookmarks sync

##References
1.https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html

##Nessary file
main.html
mainfest.json

##Entry function
the entry function of chrome plugins is "index.html" which will import main2.js and juery.mim.js

##Needs
###Download bookmarks from chrome to harddriver
get bookmarks first

##Q&A
1.Q:How to find the path of installed chrome plugins
A:
path====
C:\Users\"username"\AppData\Local\Google\Chrome\User Data\Default\Extensions
Find the id of this plugin and the id is the folder name of source code

chrome.bookmarks.getTree
