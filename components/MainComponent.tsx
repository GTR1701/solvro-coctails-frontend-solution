"use client";
import { Coctail } from "@/types/types";
import FavoriteCocktails from "./FavoriteCocktails";
import CocktailCard from "./CocktailCard";
import { getCookie } from "cookies-next";

type Props = {
	cocktails: Coctail[];
};

export default function MainComponent({ cocktails }: Readonly<Props>) {
	const favoriteCocktailsCookie = getCookie("favoriteCocktails");
	const favoriteCocktailsSplit = favoriteCocktailsCookie
		? favoriteCocktailsCookie.split(",")
		: [];
	const favoriteCocktails = cocktails.filter((cocktail) =>
		favoriteCocktailsSplit.includes(cocktail.id.toString())
	);

	return (
		<div className="w-fit mx-auto">
			{favoriteCocktailsCookie && (
				<h1 className="text-2xl font-bold text-center mt-2">
					Favorites
				</h1>
			)}
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 mx-auto">
				<FavoriteCocktails favorites={favoriteCocktails} />
			</div>
			<h1 className="text-2xl font-bold text-center mt-2">Coctails</h1>
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 mx-auto">
				{cocktails.map((cocktail) => {
					const isFavorite =
						favoriteCocktailsCookie?.includes(
							cocktail.id.toString()
						) || false;
					return (
						<CocktailCard
							key={cocktail.id}
							cocktail={cocktail}
							isFavorite={isFavorite}
						/>
					);
				})}
			</div>
		</div>
	);
}
