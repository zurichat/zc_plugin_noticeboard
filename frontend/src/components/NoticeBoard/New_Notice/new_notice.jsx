import React from "react";
import "./New_Notice/new_notice.css"

const NewNotice = () => {
    return (
        <div className="new-notice-body">
            <div className="new-notice-main">
                <h3 className="new-notice-header">Create New Notice</h3>
                <div className="new-notice">
                    <div className="sub-new-notice">
                        <label htmlFor="">Subject:</label><br />
                        <input type="text" placeholder="Enter the subject of your notice"/>
                    </div>

                    <div className="sub-new-notice">
                        <label htmlFor="">Description:</label><br />
                        <select name="" id="">
                            <option value="">Subject notice recepiants</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewNotice