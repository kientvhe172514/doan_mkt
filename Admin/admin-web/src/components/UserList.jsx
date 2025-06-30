import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleEdit = (user) => {
    setEditUser(user); // Gán user vào form
    setShowEditModal(true); // Hiện modal
  };
  const handleView = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const API_LINK = process.env.REACT_APP_API_LINK;

  // Lọc chi tiết
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    country: "",
  });
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Gọi API admin trước
        const adminRes = await axios.get(`${API_LINK}/api/admin/all`);
        const admins = (adminRes.data?.data || []).map((admin) => ({
          ...admin,
          role: "Admin",
        }));

        // Gọi API user sau
        const userRes = await axios.get(`${API_LINK}/api/user/all`);
        const users = (userRes.data?.data || []).map((user) => ({
          ...user,
          role: "User",
        }));

        // Gộp danh sách
        const merged = [...admins, ...users];
        setUsers(merged);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (API_LINK) {
      fetchAccounts();
    }
  }, [API_LINK]);

  // Tính tổng số trang khi users hoặc usersPerPage thay đổi
  useEffect(() => {
    setTotalPages(Math.ceil(users.length / usersPerPage));
  }, [users, usersPerPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Reset về trang đầu tiên khi lọc
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      email: "",
      role: "",
      status: "",
      country: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedUsers = () => {
    const sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  };

  const getFilteredUsers = () => {
    return getSortedUsers().filter((user) => {
      // Tìm kiếm đơn giản
      if (
        searchTerm &&
        !Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) {
        return false;
      }

      // Tìm kiếm nâng cao
      if (
        filters.name &&
        !user.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.email &&
        !user.email.toLowerCase().includes(filters.email.toLowerCase())
      ) {
        return false;
      }
      if (filters.role && user.role !== filters.role) {
        return false;
      }
      if (
        filters.status &&
        user.status.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  };

  // Lấy users cho trang hiện tại
  const getCurrentUsers = () => {
    const filteredUsers = getFilteredUsers();
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  };

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tạo phân trang
  const renderPagination = () => {
    const pageNumbers = [];

    // Hiển thị tối đa 5 nút trang
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </button>
          </li>

          {startPage > 1 && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => paginate(1)}>
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginate(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Lỗi: {error}
        </div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    const user = users.find((u) => u._id === id);

    if (!user) {
      alert("Không tìm thấy người dùng.");
      return;
    }

    const role = user.role;
    const endpoint = role === "Admin" ? "admin" : "user";

    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa ${role.toLowerCase()} này không?`
      )
    )
      return;

    try {
      const url = `${API_LINK}/api/${endpoint}/${id}`;
      console.log("🗑️ Đang gửi DELETE tới:", url);

      const res = await axios.delete(url);

      console.log("✅ Xóa thành công:", res.data);
      // Cập nhật danh sách
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("❌ Lỗi khi xóa:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Không thể xóa người dùng. Vui lòng thử lại."
      );
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        editUser.role === "Admin" ? "admin/update-admin" : "user/update-user";

      await axios.put(`${API_LINK}/api/${endpoint}/${editUser._id}`, editUser);

      setUsers((prev) =>
        prev.map((u) => (u._id === editUser._id ? editUser : u))
      );

      setShowEditModal(false);
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Không thể cập nhật. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Danh sách người dùng</h2>

      {/* Tìm kiếm cơ bản */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            >
              <i className="bi bi-funnel"></i>{" "}
              {showAdvancedSearch ? "Ẩn bộ lọc" : "Bộ lọc"}
            </button>
          </div>
        </div>
        <div className="col-md-6 text-md-end">
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-1"></i> Thêm người dùng mới
          </button>
        </div>
      </div>

      {/* Tìm kiếm nâng cao */}
      {showAdvancedSearch && (
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 mb-2">
                <label className="form-label">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  placeholder="Lọc theo tên"
                />
              </div>
              <div className="col-md-3 mb-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                  placeholder="Lọc theo email"
                />
              </div>
              <div className="col-md-2 mb-2">
                <label className="form-label">Vai trò</label>
                <select
                  className="form-select"
                  name="role"
                  value={filters.role}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="col-md-2 mb-2">
                <label className="form-label">Trạng thái</label>
                <select
                  className="form-select"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả</option>
                  <option value="Active">Hoạt động</option>
                  <option value="Inactive">Không hoạt động</option>
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={clearFilters}
                >
                  <i className="bi bi-x-circle me-1"></i> Xóa bộ lọc
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hiển thị số bản ghi mỗi trang */}
      <div className="row mb-3 align-items-center">
        <div className="col-6">
          <span>
            Hiển thị {getCurrentUsers().length} trong số{" "}
            {getFilteredUsers().length} người dùng
          </span>
        </div>
        <div className="col-6 text-end">
          <label className="me-2">Hiển thị:</label>
          <select
            className="form-select form-select-sm d-inline-block w-auto"
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset về trang đầu khi thay đổi số lượng hiển thị
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Bảng hiển thị dữ liệu */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th
                onClick={() => requestSort("name")}
                style={{ cursor: "pointer" }}
              >
                Tên{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => requestSort("role")}
                style={{ cursor: "pointer" }}
              >
                Vai trò{" "}
                {sortConfig.key === "role" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th>Địa chỉ</th>
              <th
                onClick={() => requestSort("email")}
                style={{ cursor: "pointer" }}
              >
                Email{" "}
                {sortConfig.key === "email" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th>Số điện thoại</th>
              <th
                onClick={() => requestSort("status")}
                style={{ cursor: "pointer" }}
              >
                Trạng thái{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => requestSort("joiningDate")}
                style={{ cursor: "pointer" }}
              >
                Ngày tham gia{" "}
                {sortConfig.key === "joiningDate" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentUsers().map((user, index) => (
              <tr key={user.id || index}>
                <td>{user.name}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "Admin"
                        ? "bg-danger"
                        : user.role === "Manager"
                        ? "bg-success"
                        : "bg-info"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>{`${user.address}, ${user.city}, ${user.country}`}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "Active" || user.status === "active"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>{formatDate(user.joiningDate)}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-sm btn-info me-1"
                      onClick={() => handleView(user)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => handleEdit(user)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Thông báo khi không có kết quả */}
      {getFilteredUsers().length === 0 && (
        <div className="alert alert-info mt-3">
          Không tìm thấy người dùng phù hợp với từ khóa tìm kiếm.
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 0 && renderPagination()}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Chỉnh sửa người dùng</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tên</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editUser?.name || ""}
                      onChange={(e) =>
                        setEditUser((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editUser?.email || ""}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editUser?.phone || ""}
                      onChange={(e) =>
                        setEditUser((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {/* Thêm các trường khác nếu cần */}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Đóng
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showViewModal && viewUser && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết người dùng</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <p>
                      <strong>Tên:</strong> {viewUser.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {viewUser.email}
                    </p>
                    <p>
                      <strong>Số điện thoại:</strong> {viewUser.phone}
                    </p>
                    <p>
                      <strong>Vai trò:</strong> {viewUser.role}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {viewUser.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
