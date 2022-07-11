import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-image"
          />
          <div className="job-name-rating-container">
            <h1 className="job-title-heading">{title}</h1>
            <div className="logo-rating-container">
              <BsFillStarFill className="star-logo" />
              <p className="rating-number">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-and-package-container">
          <div className="location-and-job-type-container">
            <MdLocationOn className="location-logo" />
            <p className="location-name">{location}</p>
            <BsFillBriefcaseFill className="location-logo" />
            <p className="location-name">{employmentType}</p>
          </div>
          <p className="package-per-annum-text">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
