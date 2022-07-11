import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profileBioDetails: {},
  }

  componentDidMount() {
    this.getJobDetails()
    this.getProfileDetails()
  }

  getUpdatedProfile = eachItem => ({
    name: eachItem.name,
    profileImageUrl: eachItem.profile_image_url,
    shortBio: eachItem.short_bio,
  })

  getProfileDetails = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(profileUrl, options)
    if (profileResponse.ok === true) {
      const profileData = await profileResponse.json()
      // console.log(profileResponse)
      // console.log(profileData)
      const updatedProfileData = this.getUpdatedProfile(
        profileData.profile_details,
      )
      console.log(updatedProfileData)
      this.setState({profileBioDetails: updatedProfileData})
    }
  }

  getJobDetails = async () => {
    const jobsApiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      // console.log(response)
      // console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(jobDetails => ({
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }))
      this.setState({jobsList: updatedData})
    }
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0

    return showJobsList ? (
      <div className="all-jobs-container">
        <ul className="jobs-list">
          {jobsList.map(eachJob => (
            <JobCard jobData={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-found-container">
        <img
          className="no-jobs-image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="all-jobs-section-with-header">
        <Header />
        <div className="all-jobs-section">{this.renderJobsListView()}</div>
      </div>
    )
  }
}

export default Jobs
