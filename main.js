Webcam.set({
    width:360,
    height:250,
    image_format : 'png',
    png_quality:90
})

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="Emotion" src="'+data_uri+'">';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ViEfK5Mwc/model.json',modelLoaded);

function modelLoaded() {
    console.log("hi");
}

function speak()
{
    var synth = window.speechSynthesis;

    speak_data1 = "I think you have " + prediction_1;
    speak_data2 = "or else " + prediction_2;
 
    

    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);

    synth.speak(utterThis);
}

    function check() 
    {

      img = document.getElementById('Emotion');
      classifier.classify(img, gotResult);

    }

    function gotResult(error, results)
    {

       if (error) {
           console.error(error);
       }
       else
       {
           console.log(results);
           document.getElementById("result_emotion_name").innerHTML = results[0].label;
           document.getElementById("result_emotion_name2").innerHTML = results[1].label;
           prediction_1 = results[0].label;
           prediction_2 = results[1].label;
           speak();
           if (results[0].label == "oral cancer - neck")
           {
               document.getElementById("update_emoji").innerHTML = "you have chances of having oral and neck cancer. you should immediately go and consult some physician for proper diagnosis and treatment "
           }
           if (results[0].label == "oral cancer - cheek,tongue or mouth")
           {
               document.getElementById("update_emoji").innerHTML = "you have chances of having cheek/toungue or mouth cancer. you should immediately go and consult some physician for proper diagnosis and treatment"
           }
           if (results[0].label == "skin cancer")
           {
               document.getElementById("update_emoji").innerHTML = "you have chances of having skin cancer. you should immediately go and consult some physician for proper diagnosis and treatment"
           }
           if (results[0].label == "healthy")
           {
               document.getElementById("update_emoji").innerHTML = "you are healthy. you should still go and consult some physician for proper diagnosis "
           }
           if (results[1].label == "oral cancer - neck")
           {
               document.getElementById("update_emoji2").innerHTML = "you have low chances of having oral and neck cancer. but you should still go and consult some physician for proper diagnosis and treatment"
           }
           if (results[1].label == "oral cancer - cheek,tongue or mouth")
           {
               document.getElementById("update_emoji2").innerHTML = "you have low chances of having cancer. but you should still go and consult some physician for proper diagnosis and treatment"
           }
           if (results[1].label == "skin cancer")
           {
               document.getElementById("update_emoji2").innerHTML = "you have low chances of having skin cancer. but you should still go and consult some physician for proper diagnosis and treatment"
           }
           if (results[1].label == "healthy")
           {
               document.getElementById("update_emoji2").innerHTML = "you are healthy. you should still go and consult some physician for proper diagnosis "
           }
       }

    }


