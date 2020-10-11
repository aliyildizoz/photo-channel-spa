import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import * as categoryAsyncActions from '../../redux/actions/category/categoryAsyncActions'
import { Badge, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';

class CategoryList extends Component {

    componentDidMount() {
        this.props.actions.getCategories();
    }
    selectCategory = (c) => {
        this.props.actions.currentCategory(c)
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
                            // onSelect={onChange}
                            // onRemove={onChange}
                            placeholder="Kategori ara"
                        /><Button className="mt-2" block>Kanalları bul</Button>
                    </ListGroupItem>
                    <ListGroupItem >
                        <h5>
                            {

                                this.props.categories.map(c => (
                                    <Badge
                                        variant="info"
                                        className="ml-2 mt-2 cursorPointer category "
                                        style={{ background: c.id == this.props.currentCategory.id ? "#5bc0de" : "" }}
                                        onClick={() => this.selectCategory(c)} key={c.id}>{c.name}</Badge>
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

    return { categories: state.categoryListReducer, currentCategory: state.changeCategoryReducer }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCategories: bindActionCreators(categoryAsyncActions.getCategories, dispatch),
            currentCategory: bindActionCreators(categoryAsyncActions.changeCategory, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);