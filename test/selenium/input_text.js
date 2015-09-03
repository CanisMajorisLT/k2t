/**
 * Created by vyt on 2015-08-06.
 */

var Webdriver = require("selenium-webdriver");
var By = Webdriver.By;
var Keys = Webdriver.Key;
var async = require("async");


var driver = new Webdriver.Builder()
    .forBrowser("firefox")
    .build();

function quitD() {
    driver.quit()
}


driver.get("http://localhost:3000/");
driver.sleep(100);



driver.findElement(By.id("random")).click();
var input = driver.findElement(By.css("input"));
function sendBS() {
    input.sendKeys(" ")
}

driver.sleep(100);
driver.findElement(By.className("text")).getText().then(function (text) {
    var words = text.split(" ");
    async.eachSeries(words, function (word, callback) {
        //input.sendKeys(word + " ");
        async.eachSeries(word.split(""), function (letter, cback) {

            input.sendKeys(letter).then(cback);

        }, function () {
            sendBS();
            callback()

        });
    }, quitD)
});

