"use server";

import MainComponent from "./Landing";
import axios from "axios";

export default async function Home() {
	const response = await axios.get(
		"https://cocktails.solvro.pl/api/v1/cocktails?ingredients=true"
	);
	return (
		<div>
			<MainComponent cocktails={response.data.data} />
		</div>
	);
}
