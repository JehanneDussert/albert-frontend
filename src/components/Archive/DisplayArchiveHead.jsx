import { archiveTabsTitle } from "../../utils/manageTabs";

export function DisplayArchiveHead() {
	
    return <thead>
		<tr>
			{archiveTabsTitle.map((title, index) => {
				return <th key={index} className="archive-tabs-title">{title.name}</th>
			})}
		</tr>
	</thead>
}