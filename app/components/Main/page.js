//Main
import styles from "./main.module.scss";
import Category from "../Category/page";


export default function Main(){
	
	const categoryNames = [
		"Space Exploration",
		"Military",
		"Housing",
		"Medicine",
		"Infrastructure"
	]
	return (<>
		<div className={styles.main}>
			{categoryNames.map((category)=>
				<Category categoryName={category} key={`category-${category}`} />
			)}
		</div>
	</>)
}