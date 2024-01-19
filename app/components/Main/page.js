//Main
import {useContext,useEffect} from "react";
import styles from "./main.module.scss";
import Category from "../Category/page";
import { SelectedCategoriesContext } from "@/app/contexts/SelectedCategoriesProvider";


export default function Main(){
	const {listOfCategories} = useContext(SelectedCategoriesContext);

	// const categoryNames = [
	// 	"Space Exploration",
	// 	"Military",
	// 	"Housing",
	// 	"Medicine",
	// 	"Infrastructure"
	// ]
	useEffect(() => {
		listOfCategories.forEach(category => {
		  console.log(category.name);
		});
	  }, [listOfCategories]);
	  

	return (<>
		<div className={styles.main}>
			{listOfCategories.map((category)=>
			<Category categoryName={category.name} key={`category-${category.name}`} />
				
			)}
		</div>
	</>)
}