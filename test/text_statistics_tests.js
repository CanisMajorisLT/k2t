/**
 * Created by vyt on 2015-08-11.
 */
require("babel/polyfill");
let should = require("chai").should();
let functions = require("../dev/js/statistics/statistics_calculation_functions-compiled");
let statistics = require("../dev/js/statistics/comprehensive_statistics");

let LSG = require("./utils/localStorage_data_generator");

describe("statistics from localStorage", function () {
    this.slow(25000);
    let localStorageData;

    before(function (done) {
        LSG(4).then((r)=> {
            localStorageData = window.localStorage;
            delete localStorageData["debug"]; // temporary solution, should move all game data to localStorage[gameData]
            console.log("i should finish first");
            done();

        })
    });

    it("should wait until before is done (mocha!!)", ()=> {

        describe("localStorage output", ()=> {
            Object.keys(localStorageData).forEach((oneKey)=> {
                it("should be a string consisting of md5 hash and a time output in seconds", ()=> {

                    let [hashValue, timeStamp] = oneKey.split("-");
                    timeStamp.should.be.a("string").that.has.length(13);
                    hashValue.should.match(/^[a-f0-9]{32}$/)
                })
            })
        });

        describe("singleWordStats", ()=> {
            let singleWordStats = functions.singleWordStats;

            Object.keys(localStorageData).forEach((key)=> {
                // loop through all games
                let oneTextWordsData = JSON.parse(localStorageData[key]).wordStats;
                oneTextWordsData.forEach((oneWordStats)=> {
                    // loop through each games wordStats

                    let singleWordStatsResult = singleWordStats(oneWordStats);

                    it("should be an object", ()=> {
                        singleWordStatsResult.should.be.a("object")

                    });

                    it("should have 4 properties", ()=> {
                        singleWordStatsResult.should.have.property("word").that.is.a("string");
                        singleWordStatsResult.should.have.property("mistakes").that.is.a("number");
                        singleWordStatsResult.should.have.property("heatMap").that.is.an("array");
                        singleWordStatsResult.should.have.property("typingTime").that.is.a("number");
                    })

                })

            });

        });

        describe("wordsStatisticsCalculator", ()=> {
            let wordsStatisticsCalculator = functions.wordsStatisticsCalculator;


            Object.keys(localStorageData).forEach((key)=> {

                let oneGameData = JSON.parse(localStorageData[key]);
                let wordsStatisticsCalculatorResult = wordsStatisticsCalculator(oneGameData.wordStats);


                it("should be an object", ()=> {
                    wordsStatisticsCalculatorResult.should.be.an("object");
                });


                it("should have property totalMistakesInText", ()=> {
                    wordsStatisticsCalculatorResult.should.have.property("totalMistakesInText").that.is.a("number");


                });
                it("should have property words with additional properties", ()=> {
                    wordsStatisticsCalculatorResult.should.have.property("words").that.is.an("array");
                    wordsStatisticsCalculatorResult.words.forEach((oneWord)=> {
                        oneWord.should.have.property("word")
                            .that.is.a("string");
                        oneWord.should.have.property("mistakes")
                            .that.is.a("number");
                        oneWord.should.have.property("heatMap")
                            .that.is.an("array");
                        oneWord.should.have.property("typingTime")
                            .that.is.a("number")
                    })

                })


            });
        });
        /*describe("wordsStatisticsCalculator_deprected", ()=> {
         let wordsStatisticsCalculator = functions.wordsStatisticsCalculator_deprected;


         Object.keys(localStorageData).forEach((key)=> {

         let oneGameData = JSON.parse(localStorageData[key]);
         let wordsStatisticsCalculatorResult = wordsStatisticsCalculator(oneGameData.wordStats);


         it("should be an object", ()=> {
         wordsStatisticsCalculatorResult.should.be.a("object");
         });


         it("should have property totalMistakesInText", ()=> {
         wordsStatisticsCalculatorResult.should.have.property("totalMistakesInText").that.is.a("number");


         });
         it("should have property words with additional properties", ()=> {
         wordsStatisticsCalculatorResult.should.have.property("words").that.is.an("object");
         Object.keys(wordsStatisticsCalculatorResult.words).forEach((word)=> {
         let oneWord = wordsStatisticsCalculatorResult.words[word]

         oneWord.should.have.property("count")
         .that.is.a("number");
         oneWord.should.have.property("mistakes")
         .that.is.a("number");
         oneWord.should.have.property("heatMap")
         .that.is.an("array");
         oneWord.should.have.property("typingTime")
         .that.is.an("object")
         .with.keys(["all", "fastest"])
         })

         })

         });
         });*/ //deprected


        describe("gameSpecificsStats", ()=> {
            let gameSpecificsStatsResult = statistics.gameSpecificsStats(localStorageData);

            it("should take an object and rune array of same length as object has keys", ()=> {
                let keys = Object.keys(localStorageData);
                gameSpecificsStatsResult.should.be.a("array");
                gameSpecificsStatsResult.length.should.equal(keys.length);

            });
            gameSpecificsStatsResult.forEach((gameSpecificStatsObject)=> {
                it("should have 6 properties", ()=> {
                    gameSpecificStatsObject.should.have.property("gameId");
                    gameSpecificStatsObject.should.have.property("textLengthInWords");
                    gameSpecificStatsObject.should.have.property("WPM");
                    gameSpecificStatsObject.should.have.property("mistakesPerWord");
                    gameSpecificStatsObject.should.have.property("totalMistakesInText");
                    gameSpecificStatsObject.should.have.property("words")
                })

            });


        });

        describe("textSpecificStats", ()=> {
            //let textSpecificStatsResult = statistics.textSpecificStats(localStorageData);
            it("should take results from gameSpecificsStats and return averenges and accumulative properties for same texts", ()=> {
                // unwritten testes, but ir should be ok since it uses overallstats and wordsSpecificStatsForSameText.
            })

        });

        describe("wordsSpecificStats", ()=> {
            let gameSpecificsStatsResult = statistics.gameSpecificsStats(localStorageData);
            let wordsSpecificStatsResult = statistics.wordsSpecificStats(gameSpecificsStatsResult);

            it("should take results from gameSpecificsStats, loop through #words and return averege and accumulative properties for each word", ()=> {

                Object.keys(wordsSpecificStatsResult).forEach((wordKey)=> {
                    let oneWord = wordsSpecificStatsResult[wordKey];
                    oneWord.should.have.property("count")
                        .that.is.a("number");
                    oneWord.should.have.property("mistakes")
                        .that.is.a("number");
                    oneWord.should.have.property("typingTime")
                        .that.is.an("object");

                    oneWord.typingTime.should.have.property("all")
                        .that.is.an("array");
                    oneWord.typingTime.should.have.property("fastest")
                        .that.is.a("number");
                })

            })

        });

        describe("wordsSpecificStatsForSameText", ()=> {
            let gameSpecificsStatsResult = statistics.gameSpecificsStats(localStorageData);
            let wordsSpecificStatsForSameText = statistics.wordsSpecificStatsForSameText;

            it("should take an array of results from gameSpecificStats only for games of the same text (called by textSpecificStats)", ()=> {
                let groupedByText = gameSpecificsStatsResult.reduce((accum, current)=> {
                    let textId_actual = current.gameId.split("-")[0];
                    if (!accum.hasOwnProperty(textId_actual)) {
                        accum[textId_actual] = [];
                    }
                    accum[textId_actual].push(current);
                    return accum
                }, {});
                Object.keys(groupedByText).forEach((key)=> {
                    let wordSpecificResults = wordsSpecificStatsForSameText(groupedByText[key]);

                    wordSpecificResults.should.have.a.property("wordsMap")
                        .that.is.an("object");
                    wordSpecificResults.should.have.a.property("words")
                        .that.is.an("array");
                    wordSpecificResults.words.forEach((wordObj)=> {

                        wordObj.should.have.property("count")
                            .that.is.a("number");
                        wordObj.should.have.property("mistakes")
                            .that.is.a("number");
                        wordObj.should.have.property("typingTime")
                            .that.is.an("object");

                        wordObj.typingTime.should.have.property("all")
                            .that.is.an("array");
                        wordObj.typingTime.should.have.property("fastest")
                            .that.is.a("number");
                    });

                    Object.keys(wordSpecificResults.wordsMap).forEach((wordKey)=> {
                        // check if map of words matches actual word position
                        let indexOfWord = wordSpecificResults[wordKey];
                        wordSpecificResults.words[indexOfWord].word.should.be.equal(wordKey.toString())
                    })


                })

            })
        });

        describe("overAllStats", ()=> {
            let gameSpecificsStatsResult = statistics.gameSpecificsStats(localStorageData);
            let overAllStatsResult = statistics.overAllStats(gameSpecificsStatsResult);

            it("should take results from gameSpecificsStats and return averege and accumulative properties", ()=> {

                overAllStatsResult.should.have.property("WPM")
                    .that.is.a("number");
                overAllStatsResult.should.have.property("totalMistakes")
                    .that.is.a("number");
                overAllStatsResult.should.have.property("MPW")
                    .that.is.a("number")

            })

        })

    });

});

describe("WPM calculator function", function () {
    let calculateWPM = functions.calculateWPM;
    let startTime = Date.now();
    let finishTime = startTime + 10000; //10 sec
    let textLength = 10;
    it("should take startTime, endTime and text length in words and calculate words per minute", function () {

        let wpm = calculateWPM(startTime, finishTime, textLength);
        wpm.should.equal(60)
    })
});

describe("objectToArray", ()=> {
    it("should take an object and return it's properties in an array", ()=> {
    });
    it("should parse objects properties to JSON", ()=> {
    })

});
