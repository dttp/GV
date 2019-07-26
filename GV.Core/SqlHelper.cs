using System;
using System.Data;
using System.Data.SqlClient;

namespace GV.Core
{
    public class SqlHelper
    {
        public static TResult ExecuteReader<TResult>(string connectionString, CommandType commandType, string commandText, SqlParameter[] parameters, Func<IDataReader, TResult> func)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (var comm = CreateCommand(conn, commandType, commandText, parameters))
                {
                    var dr = comm.ExecuteReader();
                    var result = func(dr);
                    return result;
                }
            }
        }

        public static TResult ExecuteReader<TResult>(string connectionString, string storedProcedureName, SqlParameter[] parameters, Func<IDataReader, TResult> func)
        {
            return ExecuteReader(connectionString, CommandType.StoredProcedure, storedProcedureName, parameters, func);
        }

        public static TResult ExecuteScalar<TResult>(string connectionString, string storedProcedureName, SqlParameter[] parameters)
        {
            return ExecuteScalar<TResult>(connectionString, CommandType.StoredProcedure, storedProcedureName, parameters);
        }

        public static TResult ExecuteScalar<TResult>(string connectionString, CommandType commandType, string commandText, SqlParameter[] parameters)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (var comm = CreateCommand(conn, commandType, commandText, parameters))
                {
                    var result = comm.ExecuteScalar();
                    return (TResult)result;
                }
            }
        }

        public static int ExecuteNonQuery(string connectionString, string storedProcedureName,
            SqlParameter[] parameters)
        {
            return ExecuteNonQuery(connectionString, CommandType.StoredProcedure, storedProcedureName, parameters);
        }

        public static int ExecuteNonQuery(string connectionString, CommandType commandType, string commandText, SqlParameter[] parameters)
        {
            int iRet = -1;
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (var comm = CreateCommand(conn, commandType, commandText, parameters))
                {
                    iRet = comm.ExecuteNonQuery();
                }
                conn.Close();
            }
            return iRet;
        }

        public static void ExecuteCommand(SqlConnection connection, SqlTransaction transaction, string storedProcedure, SqlParameter[] parameters)
        {
            ExecuteCommand(connection, transaction, CommandType.StoredProcedure, storedProcedure, parameters);
        }
        public static void ExecuteCommand(SqlConnection connection, SqlTransaction transaction, CommandType commandType,
            string commandText, SqlParameter[] parameters)
        {
            using (var command = CreateCommand(connection, commandType, commandText, parameters))
            {
                command.Transaction = transaction;
                command.ExecuteNonQuery();
            }
        }

        public static void StartTransaction(string connectionString, Action<SqlConnection, SqlTransaction> action)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var transaction = conn.BeginTransaction();
                try
                {
                    action.Invoke(conn, transaction);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        #region private
        public static SqlCommand CreateCommand(SqlConnection conn, CommandType commandType, string commandText, SqlParameter[] parameters, int timeoutSeconds = 60)
        {
            var comm = new SqlCommand(commandText);
            comm.Parameters.Clear();
            if (parameters != null && parameters.Length > 0)
            {
                foreach (var param in parameters)
                {
                    comm.Parameters.Add(param);
                }
            }
            comm.CommandType = commandType;
            comm.CommandTimeout = timeoutSeconds;
            comm.Connection = conn;
            comm.CommandText = commandText;
            return comm;
        }

                private static void DisposeCommand(SqlCommand comm)
                {
                    comm.Parameters.Clear();
                    comm.Connection.Close();
                    comm.Dispose();
                }
        #endregion private

    }
}

