"use server";

import AllCocktails from "@/components/AllCocktails";
import axios from "axios";

export default async function Home() {
	const response = await axios.get(
		"https://cocktails.solvro.pl/api/v1/cocktails?ingredients=true"
	);
	return (
		<div>
			<AllCocktails cocktails={response.data.data} />
		</div>
	);
}
