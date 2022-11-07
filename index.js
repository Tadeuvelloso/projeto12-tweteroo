import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let tweets = [
	{
		username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		tweet: "eu amo o hub"
	}
];

let dataUser = [];

app.post("/sign-up", (req, res) => {

	const { username, avatar } = req.body

	const newUser = {
		username,
		avatar,
	}

	dataUser.push(newUser);
	res.send("OK")
})

app.post("/tweets", (req, res) => {
	const { username, tweet } = req.body

	if (!username || !tweet) {
		res.status(400).send({ message: "Algum campo vazio!" });
		return
	}

	const newTweet =
	{
		username,
		tweet,
	}


	tweets.push(newTweet);

	res.status(201).send("OK!");
})


app.get("/tweets", (req, res) => {

	const lastTweets = tweets.slice(-10)
	const tweetsCompletes = [];


	for (let i = 0; i < lastTweets.length; i++){
		const item = lastTweets[i];
		if(item.username !== undefined && item.tweet !== undefined){
		const avatarUser = dataUser.find((o) => item.username === o.username);
		
		const completeObj = {
			username: item.username,
			avatar: avatarUser.avatar,
			tweet: item.tweet,
		}

		tweetsCompletes.push(completeObj);
		}
	}

	res.status(200).send(tweetsCompletes);
});

app.listen(5000, () => {
	console.log("Server runing in port: 5000");
});
