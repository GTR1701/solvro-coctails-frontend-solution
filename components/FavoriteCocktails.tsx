"use client";

import { Coctail } from "@/types/types";
import CocktailCard from "./CocktailCard";
import { getCookie } from "cookies-next";

type Props = {
	favorites: Coctail[];
};

export default function FavoriteCocktails({ favorites }: Readonly<Props>) {
	const favoriteCocktailsCookie = getCookie("favoriteCocktails");

	return (
		<>
			{favorites.map((cocktail) => {
				const isFavorite =
					favoriteCocktailsCookie?.includes(cocktail.id.toString()) ||
					false;
				return (
					<CocktailCard
						key={cocktail.id}
						cocktail={cocktail}
						isFavorite={isFavorite}
					/>
				);
			})}
		</>
	);
}
