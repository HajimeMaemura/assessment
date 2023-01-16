'use strict';

const userNameInput = document.getElementById('user-name');
//入力欄操作できるよー
const assessmentButton = document.getElementById('assessment');
//診断するボタン
const resultDivided = document.getElementById('result-area');
//診断結果を表示
const tweetDivided = document.getElementById('tweet-area');
//ツイートボタンを作成するエリア

assessmentButton.onclick = function () {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前の入力がなければそこで処理を終了する
        return; //処理を終了する、というふうにも使える、今回はif文がtrueならここで処理を中止する的なイメージ、ガード句と言います。 breakとの違いはわかりませんでしたｗ//valueはプロパティ
    }
    resultDivided.innerText = '';//いやなんでこれ入れたら、重複が消えるんだよｗ
    tweetDivided.innerText = ''; // function押された時に、左記IDのインナーテキスト削除する。
    const header = document.createElement('h3'); //見出し用、<h3></h3>
    header.innerText = '診断結果'; //<h3>診断結果</h3>
    resultDivided.appendChild(header);
    //<div id="result-area"><h3>診断結果</h3></div>


    const paragraph = document.createElement('p'); //ｐタグ
    const result = assessment(userName);//診断結果を用意しておく
    paragraph.innerText = result;//<p>アセスメント関数の実行結果</p>
    resultDivided.appendChild(paragraph);
    //<div id="result-area">
    //<h3>診察結果</h3>
    //<p>XXさんのいいところはXXです</p>
    //</div>
    //もう既に、かっこの中なので、上記のresultdividedは、h3が含まれてる状態を指している。

    tweetDivided.innerText = '';//診断ボタンを押すたびツイートボタンが増えないように都度消す
    const anchor = document.createElement('a');// <a></a>
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    } //文字列のlength分、足し終わるまで
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replaceAll('{userName}', userName);
    return result;
}
console.log(assessment('太郎'));
console.log(assessment('村上'));
console.log(assessment('田中'));
console.log(assessment('田中'));
console.log(assessment('寺岡'));



