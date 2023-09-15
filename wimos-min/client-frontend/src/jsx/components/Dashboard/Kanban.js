import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import Board, { moveCard } from "@lourenci/react-kanban";
import { board	} from './Kanban/KanbanData';

//images
import pic1 from './../../../images/profile/small/pic1.jpg';
import pic2 from './../../../images/profile/small/pic2.jpg';
import pic3 from './../../../images/profile/small/pic3.jpg';
import pic4 from './../../../images/profile/small/pic4.jpg';
import pic5 from './../../../images/profile/small/pic5.jpg';

function ControlledBoard() {
	// You need to control the state yourself.
	const [controlledBoard, setBoard] = useState(board);

	function handleCardMove(_card, source, destination) {
		const updatedBoard = moveCard(controlledBoard, source, destination);
		setBoard(updatedBoard);
	}
	return (
		<Board onCardDragEnd={handleCardMove} disableColumnDrag>
			{controlledBoard}
		</Board>
	);
}

const Kanban = () =>{
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body">
							<div className="d-flex align-items-center justify-content-between flex-wrap">
								<div className="mb-3">
									<h4 className="fs-24 font-w700">Fillow Company Profile Website Phase 1</h4>
									<span>Created by <strong>Hajime Mahmude</strong> n on June 31, 2020</span>
									<div className="d-flex align-items-center mt-4 flex-wrap">
										<ul className="kanbanimg me-3 mb-3">
											<li><img src={pic1} alt="" /></li>
											<li><img src={pic2} alt="" /></li>
											<li><img src={pic3} alt="" /></li>
											<li><img src={pic4} alt="" /></li>
											<li><img src={pic5} alt="" /></li>
											<li><span>5+</span></li>
										</ul>
										<div className="ms-4 invite mb-3">
											<Link to={"#"} className="btn btn-primary light btn-rounded btn-md me-2 mb-2"><i className="fas fa-user-plus me-3 scale5"></i>Invite People</Link>
											<Link to={"#"} className="btn btn-outline-light btn-rounded btn-md me-2 mb-2">Edit</Link>
											<Link to={"#"} className="btn btn-outline-light btn-rounded btn-md me-2 mb-2">Private</Link>
											<Link to={"#"} className="btn btn-outline-light btn-rounded btn-md mb-2"><i className="far fa-comment-alt scale5 text-primary me-3"></i>45 Comments</Link>
										</div>
									</div>	
								</div>
								<div className="mb-3">
									<div className="d-flex align-items-center mb-4 pb-3 justify-content-end flex-wrap">
										<div className="me-3">
											<h4 className="fs-18 font-w600">Fillow Studios</h4>
											<span>Software House</span>
										</div>
										<div className="facebook-icon me-3">
											<Link to={"#"}><i className="fab fa-facebook-f"></i></Link>
										</div>
										<div>
											<Dropdown className="dropdown">
												<Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown">
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
														<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
														<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
													</svg>
												</Dropdown.Toggle>
												<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
													<Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
													<Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
									<div className="d-flex  justify-content-end align-items-center">
										<span className="fs-16 font-w600 me-3">Total Progress 60%</span>
										<div className="progress default-progress flex-1">
											<div className="progress-bar bg-gradient1 progress-animated" style={{width: "45%", height:"10px"}} role="progressbar">
												<span className="sr-only">45% Complete</span>
											</div>
										</div>
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>				
			</div>	
			<div className="kanban-bx">
				<div className="kanbanPreview-bx">
					<div className="draggable-zone dropzoneContainer">
						<ControlledBoard />
					</div>
				</div>
			</div>
		</>
	)
}
export default Kanban;