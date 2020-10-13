const mUrl = '/api/ShuvalovSasha/lab1/labFirst_var2';
var express = require('express');
var app = express();
var fs = require('fs');
app.set('view engine', 'pug');

fs.open('errorLog.txt', 'w+', (err, fd) => {
	if (err) throw err;
});


app.use(function (req,res,next){
    console.log(req.hostname + req.path)
    next()
});

app.use(mUrl + "task2",function (req,res,next){
    if(req.query.admin === 'true'){
        next();
    }
    else{
		fs.appendFile('errorLog.txt', req.hostname + req.path + " error 403 in task2" + "\n", (err) => {
			if(err) throw err;
			console.log('Error has been added!');
		});
		res.status(403).send("Not auth");
        
    }

});

app.use(mUrl + "task3",function (req,res,next){
    console.log("task3 check:");
    next();

});

app.use(mUrl + "task3",function (req,res,next){
    if(req.query.admin === 'true'){
        next();
    }
    else{
		fs.appendFile('errorLog.txt', req.hostname + req.path + " error 403 in task3" + "\n", (err) => {
			if(err) throw err;
			console.log('Error has been added!');
		});
		res.status(403).send("Not auth");
    }


});



app.get('/', function(request, response) {
  response.send("<h1>Welcome, add this string in url</h1>"+"<h4>/api/ShuvalovSasha/lab1/labFirst_var2/views/menu</h4>")
});

app.get(mUrl + "task1", function (req, res) {
	
	console.log(req.query)
	let fruits = req.query.fruit;
	let number = req.query.number;
	let responseText = "Your array:" 
	for(let i = 0; i<number;i++){
    		fruits.push(fruits[i]);
	}
	
	for(let i = 0; i<number;i++){
    		fruits.shift(fruits[i])
	}
	for (let j = 0; j < fruits.length; j++) {
    responseText +=fruits[j]+ " ";
  }

	res.render("/api/ShuvalovSasha/lab1/labFirst_var2/views/T1", {
		title: "work",
		message: responseText
	});


});

app.use("/api/ShuvalovSasha/lab1/labFirst_var2/views/menu", function (req,res){
	res.render("/api/ShuvalovSasha/lab1/labFirst_var2/views/menu", {
		title: "work"
	});
});
app.use("/api/ShuvalovSasha/lab1/labFirst_var2/views/exampl1", function (req,res){
	res.render("/api/ShuvalovSasha/lab1/labFirst_var2/views/exampl1", {
		title: "work"
	});
});
app.use("/api/ShuvalovSasha/lab1/labFirst_var2/views/exampl2", function (req,res){
	res.render("/api/ShuvalovSasha/lab1/labFirst_var2/views/exampl2", {
		title: "work"
	});
});
app.use("/api/ShuvalovSasha/lab1/labFirst_var2/views/exampl3", function (req,res){
	res.render("/api/ShuvalovSasha/lab1/labFirst_var2/views/exampl3", {
		title: "work"
	});
});
app.get(mUrl + 'task2', function (req, res) {  //формат ввода д1 = 123221 д2 =654566
function showMinutes() {
    let m1 = req.query.data1;
    let S1 = req.query.data2;
    let newm1 = m1.split(",");
    let newS1 = S1.split(",");
    console.log(req.query)
    let responseText = "Month difference: ";
    responseText += Math.abs(newm1[0]-newS1[0]);
     responseText += " Hours difference: ";
      responseText += Math.abs(newm1[1]-newS1[1]);
      responseText += " Minutes difference: ";
      responseText += Math.abs(newm1[2]-newS1[2]);
      responseText += " Second difference: ";
      responseText += Math.abs(newm1[3]-newS1[3]);
      res.render("/api/ShuvalovSasha/lab1/labFirst_var2/views/T2", {
		title: "work",
		message: responseText
	});

  
}
showMinutes();
});
app.get(mUrl + 'task3', function (req, res) {
    let resText = req.query.Text1;
    let resT = req.query.Text2;
    let resTe = req.query.Text3;
    let rek = req.query.Text4;
    console.log(req.query)
    const promise1 = new Promise((resolve, reject) => {
	 setTimeout(() => resolve("Promise1"), resText);
	 setTimeout(() => reject(new Error("ignored1")), resT);

    });
    const promise2 = new Promise((resolve, reject) => {
	 setTimeout(() => resolve('Promise2 выполнен'),resTe);
	 setTimeout(() => reject(new Error("ignored2")), rek);
    });
    Promise.all([promise1, promise2])
	 .then((data) => res.render("/api/ShuvalovSasha/lab1/labFirst_var2/views/T3", {
		title: "work",
		message: "complete promise"
	})
	)
	 .catch((error) => res.render("/api/ShuvalovSasha/lab1/labFirst_var2/views/T3", {
		title: "work",
		message: "Error"
	}))
});

app.use(function (req, res, next) {
	res.status(404).send("Not Found")
	fs.appendFile('errorLog.txt', req.hostname + req.path + " error 404 " + "\n", (err) => {
		if(err) throw err;
		console.log('Error has been added!');
	});
	next()
});

app.listen(4001, (error) => {
  if (error) {
	  fs.appendFile('errorLog.txt', req.hostname + req.path + " error 500 in server" + "\n", (err) => {
		  if(err) throw err;
		  console.log('Error has been added!');
	  });
  }
  console.error('Example port 4001')});