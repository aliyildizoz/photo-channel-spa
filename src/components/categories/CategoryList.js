import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import * as categoryActionCreators from '../../redux/actions/category/categoryActionCreators'
import * as categoryAsyncActions from '../../redux/actions/category/categoryAsyncActions'
import { Badge,  ListGroup, ListGroupItem } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import { Link } from 'react-router-dom'
import { push } from 'redux-first-history'

class CategoryList extends Component {

    componentDidMount() {
        this.props.actions.getCategories();
    }
    selectCategory = (c) => {
        this.props.actions.currentCategory(c)
    }
    onChangeHandler = (categories) => { 
        this.props.actions.setSelectedCategories(categories)
        if (categories.length > 0) {
            this.props.actions.historyPush("/feed/" + this.queryGenerate(categories))
            return;
        }
        this.props.actions.historyPush("/feed")
        this.props.setFeedState()
    }
    queryGenerate = (categories) => {
        var query = ""
        categories.forEach((c, i) => {
            query += (i !== 0 ? "-" : "") + encodeURIComponent(c.name.toLowerCase());
        });
        return query;
    }

    render() {
        return (
            <div >
                <ListGroup className="shadow-lg">
                    <ListGroupItem   >
                        <Multiselect
                            options={this.props.categories}
                            displayValue="name"
                            closeIcon="circle"
                            style={{ chips: { background: "#5bc0de" } }}
                            onSelect={this.onChangeHandler}
                            onRemove={this.onChangeHandler}
                            placeholder="Kategori ara"
                            selectedValues={this.props.selectedCategories}
                        />
                    </ListGroupItem>
                    <ListGroupItem >
                        <h5>
                            {
                                this.props.categories.map(c => (
                                    <Link onClick={() => this.onChangeHandler([c])} key={c.id} to={"/feed/" + encodeURIComponent(c.name.toLowerCase())} className="text-decoration-none"> <Badge
                                        // variant="info"
                                        className="ml-2 mt-2 cursorPointer category "
                                        style={{ background: (this.props.selectedCategories.includes(c) ? "#5bc0de" : "#17a2b8") }}
                                    >{c.name}</Badge></Link>
                                ))
                            }
                        </h5>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { categories: state.categoryListReducer, selectedCategories: state.selectedCategoriesReducer }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCategories: bindActionCreators(categoryAsyncActions.getCategories, dispatch),
            historyPush: bindActionCreators(push, dispatch),
            setSelectedCategories: bindActionCreators(categoryActionCreators.setSelectedCategoriesSuccess, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);