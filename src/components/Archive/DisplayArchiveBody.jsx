import { useState } from "react";
import { useSelector } from "react-redux";
import { NOT_SET } from "../../constants/status";

export  function DisplayArchiveBody({ setIndex, setArchiveToDisplay }) {
	const	archive = useSelector((state) => state.archive);
	const	[selected, setSelected] = useState(NOT_SET);

	const	handleClick = (index) => {
		if (index === selected)
		{
			setArchiveToDisplay(index);
			setIndex(archive[index].messages.length - 1)
		}
		setSelected(index);
	}

	return <tbody>
		{
			archive.map((item, index) => {
				const	classNames = index === selected ? 'bg-[#F5F5FE]' : 'bg-white';
				
				return <tr key={index} onClick={() => handleClick(index)} className={classNames}>
					<td className="archive-body">{item.title}</td>
					<td className="archive-body text-[11px] flex flex-wrap">{item.themes.map((theme, index) => {
						return <div key={index} className="archive-tags">{theme}</div>
					})}</td>
					<td className="archive-body">{item.date}</td>
					<td className="archive-body">{item.source ? 'Oui' : 'Non'}</td>
				</tr>
			}
		)}
	</tbody>
}